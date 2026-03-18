import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresStep,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";
import { ApiKey } from "../../.medusa/types/query-entry-points";

const updateStoreCurrencies = createWorkflow(
  "update-store-currencies",
  (input: {
    supported_currencies: { currency_code: string; is_default?: boolean }[];
    store_id: string;
  }) => {
    const normalizedInput = transform({ input }, (data) => {
      return {
        selector: { id: data.input.store_id },
        update: {
          supported_currencies: data.input.supported_currencies.map(
            (currency) => {
              return {
                currency_code: currency.currency_code,
                is_default: currency.is_default ?? false,
              };
            },
          ),
        },
      };
    });

    const stores = updateStoresStep(normalizedInput);

    return new WorkflowResponse(stores);
  },
);

export default async function seedDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);

  const countries = ["gb", "de", "dk", "se", "fr", "es", "it"];

  logger.info("Seeding store data...");
  const [store] = await storeModuleService.listStores();
  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    // create the default sales channel
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container,
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoreCurrencies(container).run({
    input: {
      store_id: store.id,
      supported_currencies: [
        {
          currency_code: "eur",
          is_default: true,
        },
        {
          currency_code: "usd",
        },
      ],
    },
  });

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });
  logger.info("Seeding region data...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Europe",
          currency_code: "eur",
          countries,
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const region = regionResult[0];
  logger.info("Finished seeding regions.");

  logger.info("Seeding tax regions...");
  await createTaxRegionsWorkflow(container).run({
    input: countries.map((country_code) => ({
      country_code,
      provider_id: "tp_system",
    })),
  });
  logger.info("Finished seeding tax regions.");

  logger.info("Seeding stock location data...");
  const { result: stockLocationResult } = await createStockLocationsWorkflow(
    container,
  ).run({
    input: {
      locations: [
        {
          name: "European Warehouse",
          address: {
            city: "Copenhagen",
            country_code: "DK",
            address_1: "",
          },
        },
      ],
    },
  });
  const stockLocation = stockLocationResult[0];

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_location_id: stockLocation.id,
      },
    },
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_provider_id: "manual_manual",
    },
  });

  logger.info("Seeding fulfillment data...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null;

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [
            {
              name: "Default Shipping Profile",
              type: "default",
            },
          ],
        },
      });
    shippingProfile = shippingProfileResult[0];
  }

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "European Warehouse delivery",
    type: "shipping",
    service_zones: [
      {
        name: "Europe",
        geo_zones: [
          {
            country_code: "gb",
            type: "country",
          },
          {
            country_code: "de",
            type: "country",
          },
          {
            country_code: "dk",
            type: "country",
          },
          {
            country_code: "se",
            type: "country",
          },
          {
            country_code: "fr",
            type: "country",
          },
          {
            country_code: "es",
            type: "country",
          },
          {
            country_code: "it",
            type: "country",
          },
        ],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: {
      stock_location_id: stockLocation.id,
    },
    [Modules.FULFILLMENT]: {
      fulfillment_set_id: fulfillmentSet.id,
    },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Standard Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Standard",
          description: "Ship in 2-3 days.",
          code: "standard",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
      {
        name: "Express Shipping",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Express",
          description: "Ship in 24 hours.",
          code: "express",
        },
        prices: [
          {
            currency_code: "usd",
            amount: 10,
          },
          {
            currency_code: "eur",
            amount: 10,
          },
          {
            region_id: region.id,
            amount: 10,
          },
        ],
        rules: [
          {
            attribute: "enabled_in_store",
            value: "true",
            operator: "eq",
          },
          {
            attribute: "is_return",
            value: "false",
            operator: "eq",
          },
        ],
      },
    ],
  });
  logger.info("Finished seeding fulfillment data.");

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: {
      id: stockLocation.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding stock location data.");

  logger.info("Seeding publishable API key data...");
  let publishableApiKey: ApiKey | null = null;
  const { data } = await query.graph({
    entity: "api_key",
    fields: ["id"],
    filters: {
      type: "publishable",
    },
  });

  publishableApiKey = data?.[0];

  if (!publishableApiKey) {
    const {
      result: [publishableApiKeyResult],
    } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "Webshop",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    });

    publishableApiKey = publishableApiKeyResult as ApiKey;
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info("Finished seeding publishable API key data.");

  logger.info("Seeding product data...");

  const { result: categoryResult } = await createProductCategoriesWorkflow(
    container,
  ).run({
    input: {
      product_categories: [
        {
          name: "Shirts",
          is_active: true,
        },
        {
          name: "Sweatshirts",
          is_active: true,
        },
        {
          name: "Pants",
          is_active: true,
        },
        {
          name: "Merch",
          is_active: true,
        },
      ],
    },
  });

  await createProductsWorkflow(container).run({
    input: {
      products: [
        {
          title: "Paloma Haven",
          subtitle: "Modern Luxe",
          description:
            "Minimalistic designs, neutral colors, and high-quality textures. Perfect for those who seek comfort with a clean and understated aesthetic. This collection brings the essence of Scandinavian elegance to your living room.",
          handle: "paloma-haven",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://raw.githubusercontent.com/ivonaaaa/ecommerce/main/web/public/images/PalomaHaven.jpg",
            },
          ],
          options: [
            { title: "Material", values: ["Linen", "Leather"] },
            { title: "Color", values: ["Dark Gray", "Black", "Light Gray"] },
          ],
          variants: [
            {
              title: "Linen / Dark Gray",
              sku: "PALOMA-LINEN-DARKGRAY",
              options: { Material: "Linen", Color: "Dark Gray" },
              prices: [{ amount: 1200000, currency_code: "eur" }],
            } as any,
            {
              title: "Linen / Black",
              sku: "PALOMA-LINEN-BLACK",
              options: { Material: "Linen", Color: "Black" },
              prices: [{ amount: 1200000, currency_code: "eur" }],
            } as any,
            {
              title: "Linen / Light Gray",
              sku: "PALOMA-LINEN-LIGHTGRAY",
              options: { Material: "Linen", Color: "Light Gray" },
              prices: [{ amount: 1200000, currency_code: "eur" }],
            } as any,
            {
              title: "Leather / Dark Gray",
              sku: "PALOMA-LEATHER-DARKGRAY",
              options: { Material: "Leather", Color: "Dark Gray" },
              prices: [{ amount: 1200000, currency_code: "eur" }],
            } as any,
            {
              title: "Leather / Black",
              sku: "PALOMA-LEATHER-BLACK",
              options: { Material: "Leather", Color: "Black" },
              prices: [{ amount: 1200000, currency_code: "eur" }],
            } as any,
            {
              title: "Leather / Light Gray",
              sku: "PALOMA-LEATHER-LIGHTGRAY",
              options: { Material: "Leather", Color: "Light Gray" },
              prices: [{ amount: 1200000, currency_code: "eur" }],
            } as any,
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },

        {
          title: "Camden Retreat",
          subtitle: "Boho Chic",
          description:
            "Boho Chic sofa with relaxed aesthetics and modern comfort...",
          handle: "camden-retreat",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://raw.githubusercontent.com/ivonaaaa/ecommerce/main/web/public/images/CamdenRetreat.png",
            },
          ],
          options: [
            { title: "Material", values: ["Linen", "Leather"] },
            { title: "Color", values: ["Dark Gray", "Black", "Light Gray"] },
          ],
          variants: [
            {
              title: "Linen / Dark Gray",
              sku: "CAMDEN-LINEN-DARKGRAY",
              manage_inventory: false,
              options: { Material: "Linen", Color: "Dark Gray" },
              prices: [{ amount: 100000, currency_code: "eur" }],
            } as any,
            {
              title: "Linen / Black",
              sku: "CAMDEN-LINEN-BLACK",
              manage_inventory: false,
              options: { Material: "Linen", Color: "Black" },
              prices: [{ amount: 100000, currency_code: "eur" }],
            } as any,
            {
              title: "Linen / Light Gray",
              sku: "CAMDEN-LINEN-LIGHTGRAY",
              manage_inventory: false,
              options: { Material: "Linen", Color: "Light Gray" },
              prices: [{ amount: 100000, currency_code: "eur" }],
            } as any,
            {
              title: "Leather / Dark Gray",
              sku: "CAMDEN-LEATHER-DARKGRAY",
              manage_inventory: false,
              options: { Material: "Leather", Color: "Dark Gray" },
              prices: [{ amount: 100000, currency_code: "eur" }],
            } as any,
            {
              title: "Leather / Black",
              sku: "CAMDEN-LEATHER-BLACK",
              manage_inventory: false,
              options: { Material: "Leather", Color: "Black" },
              prices: [{ amount: 100000, currency_code: "eur" }],
            } as any,
            {
              title: "Leather / Light Gray",
              sku: "CAMDEN-LEATHER-LIGHTGRAY",
              manage_inventory: false,
              options: { Material: "Leather", Color: "Light Gray" },
              prices: [{ amount: 100000, currency_code: "eur" }],
            } as any,
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Oslo Drift",
          subtitle: "Scandinavian Simplicity",
          description: "Scandinavian simplicity with modern touch...",
          handle: "oslo-drift",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://raw.githubusercontent.com/ivonaaaa/ecommerce/main/web/public/images/OsloDrift.png",
            },
          ],
          options: [
            { title: "Material", values: ["Linen", "Leather"] },
            { title: "Color", values: ["Dark Gray", "Black", "Light Gray"] },
          ],
          variants: [
            {
              title: "Linen / Dark Gray",
              sku: "OSLO-LINEN-DARKGRAY",
              manage_inventory: false,
              options: { Material: "Linen", Color: "Dark Gray" },
              prices: [{ amount: 200000, currency_code: "eur" }],
              compare_at_price: 300000,
            } as any,
            {
              title: "Linen / Black",
              sku: "OSLO-LINEN-BLACK",
              manage_inventory: false,
              options: { Material: "Linen", Color: "Black" },
              prices: [{ amount: 200000, currency_code: "eur" }],
              compare_at_price: 300000,
            } as any,
            {
              title: "Linen / Light Gray",
              sku: "OSLO-LINEN-LIGHTGRAY",
              manage_inventory: false,
              options: { Material: "Linen", Color: "Light Gray" },
              prices: [{ amount: 200000, currency_code: "eur" }],
              compare_at_price: 300000,
            } as any,
            {
              title: "Leather / Dark Gray",
              sku: "OSLO-LEATHER-DARKGRAY",
              manage_inventory: false,
              options: { Material: "Leather", Color: "Dark Gray" },
              prices: [{ amount: 200000, currency_code: "eur" }],
              compare_at_price: 300000,
            } as any,
            {
              title: "Leather / Black",
              sku: "OSLO-LEATHER-BLACK",
              manage_inventory: false,
              options: { Material: "Leather", Color: "Black" },
              prices: [{ amount: 200000, currency_code: "eur" }],
              compare_at_price: 300000,
            } as any,
            {
              title: "Leather / Light Gray",
              sku: "OSLO-LEATHER-LIGHTGRAY",
              manage_inventory: false,
              options: { Material: "Leather", Color: "Light Gray" },
              prices: [{ amount: 200000, currency_code: "eur" }],
              compare_at_price: 300000,
            } as any,
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
        {
          title: "Sutton Royale",
          subtitle: "Modern Luxe",
          description: "Modern Luxe premium sofa.",
          handle: "sutton-royale",
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          images: [
            {
              url: "https://raw.githubusercontent.com/ivonaaaa/ecommerce/main/web/public/images/SuttonRoyale.png",
            },
          ],
          options: [
            { title: "Material", values: ["Linen", "Leather"] },
            { title: "Color", values: ["Dark Gray", "Black", "Light Gray"] },
          ],
          variants: [
            {
              title: "Linen / Dark Gray",
              sku: "SUTTON-LINEN-DARKGRAY",
              manage_inventory: false,
              options: { Material: "Linen", Color: "Dark Gray" },
              prices: [{ amount: 250000, currency_code: "eur" }],
            } as any,
            {
              title: "Linen / Black",
              sku: "SUTTON-LINEN-BLACK",
              manage_inventory: false,
              options: { Material: "Linen", Color: "Black" },
              prices: [{ amount: 250000, currency_code: "eur" }],
            } as any,
            {
              title: "Linen / Light Gray",
              sku: "SUTTON-LINEN-LIGHTGRAY",
              manage_inventory: false,
              options: { Material: "Linen", Color: "Light Gray" },
              prices: [{ amount: 250000, currency_code: "eur" }],
            } as any,
            {
              title: "Leather / Dark Gray",
              sku: "SUTTON-LEATHER-DARKGRAY",
              manage_inventory: false,
              options: { Material: "Leather", Color: "Dark Gray" },
              prices: [{ amount: 250000, currency_code: "eur" }],
            } as any,
            {
              title: "Leather / Black",
              sku: "SUTTON-LEATHER-BLACK",
              manage_inventory: false,
              options: { Material: "Leather", Color: "Black" },
              prices: [{ amount: 250000, currency_code: "eur" }],
            } as any,
            {
              title: "Leather / Light Gray",
              sku: "SUTTON-LEATHER-LIGHTGRAY",
              manage_inventory: false,
              options: { Material: "Leather", Color: "Light Gray" },
              prices: [{ amount: 250000, currency_code: "eur" }],
            } as any,
          ],
          sales_channels: [{ id: defaultSalesChannel[0].id }],
        },
      ],
    },
  });
  logger.info("Finished seeding product data.");

  logger.info("Seeding inventory levels.");

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  const inventoryLevels: CreateInventoryLevelInput[] = [];
  for (const inventoryItem of inventoryItems) {
    const inventoryLevel = {
      location_id: stockLocation.id,
      stocked_quantity: 1000000,
      inventory_item_id: inventoryItem.id,
    };
    inventoryLevels.push(inventoryLevel);
  }

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: inventoryLevels,
    },
  });

  logger.info("Finished seeding inventory levels data.");
}
