import { ACTIVE_BRANDS, getProductsByBrand } from '@/config/brands';
import { BrandsIndexClient } from '@/components/BrandsIndexClient';

export default function BrandsPage() {
  const brands = ACTIVE_BRANDS.map((brand) => ({ ...brand, productCount: getProductsByBrand(brand.slug).length })).filter((brand) => brand.productCount > 0);
  return <BrandsIndexClient brands={brands} />;
}
