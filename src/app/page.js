import Banner from "@/components/Banner";
import FeaturedRecipes from "@/components/FeaturedRecipe";
import PopularRecipes from "@/components/PopularRecipes";
import Testimonials from "@/components/Testimonials";
import WhyRecipeHub from "@/components/WhyRecipeHub";
// import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturedRecipes></FeaturedRecipes>
      <PopularRecipes></PopularRecipes>
      <WhyRecipeHub></WhyRecipeHub>
      <Testimonials></Testimonials>
    </div>
  );
}
