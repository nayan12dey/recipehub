import Banner from "@/components/Banner";
import FeaturedRecipes from "@/components/FeaturedRecipe";
import Testimonials from "@/components/Testimonials";
import WhyRecipeHub from "@/components/WhyRecipeHub";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturedRecipes></FeaturedRecipes>
      <WhyRecipeHub></WhyRecipeHub>
      <Testimonials></Testimonials>
    </div>
  );
}
