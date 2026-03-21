import { HttpTypes } from "@medusajs/types/dist/bundles"

export function findVariant(
  variants: HttpTypes.StoreProductVariant[] | undefined,
  selectedMaterial: string,
  selectedColor: string
) {
  if (!variants?.length) return null

  const variant = variants?.find(
    (v) =>
      v.options?.find(
        (o) => o.option?.title === "Material" && o.value === selectedMaterial
      ) &&
      v.options?.find(
        (o) => o.option?.title === "Color" && o.value === selectedColor
      )
  )
  return variant ?? null
}
