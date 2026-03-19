import { HttpTypes } from "@medusajs/types/dist/bundles"

export function findVariant(
  variants: HttpTypes.StoreProductVariant[] | undefined,
  selectedMaterial: string,
  selectedColor: string
) {
  return variants?.find(
    (v) =>
      v.options?.find(
        (o) => o.option?.title === "Material" && o.value === selectedMaterial
      ) &&
      v.options?.find(
        (o) => o.option?.title === "Color" && o.value === selectedColor
      )
  )
}
