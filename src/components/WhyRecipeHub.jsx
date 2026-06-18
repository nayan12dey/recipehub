

// import {
//   FaBookOpen,
//   FaHeart,
//   FaUsers,
// } from "react-icons/fa";

// import { ChefHat } from "lucide-react";

// export default function WhyRecipeHub() {
//   const features = [
//     {
//       icon: <FaBookOpen size={28} />,
//       title: "Thousands of Recipes",
//       description:
//         "Explore a growing collection of delicious recipes from different cuisines around the world.",
//     },
//     {
//       icon: <ChefHat size={28} />,
//       title: "Easy To Follow",
//       description:
//         "Step-by-step cooking instructions make every recipe simple and enjoyable to prepare.",
//     },
//     {
//       icon: <FaHeart size={28} />,
//       title: "Save Your Favorites",
//       description:
//         "Bookmark your favorite recipes and quickly access them whenever you want to cook.",
//     },
//     {
//       icon: <FaUsers size={28} />,
//       title: "Community Driven",
//       description:
//         "Share recipes, discover new ideas, and connect with food lovers everywhere.",
//     },
//   ];

//   return (
//     <section className="bg-white py-20">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Section Header */}
//         <div className="text-center max-w-3xl mx-auto">
//           <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-medium text-sm">
//             Why Choose Us
//           </span>

//           <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900">
//             Why RecipeHub?
//           </h2>

//           <p className="mt-5 text-lg text-gray-600">
//             RecipeHub is more than just a recipe platform. It's a place where
//             food lovers discover new dishes, improve cooking skills, and share
//             their passion for great food.
//           </p>
//         </div>

//         {/* Feature Cards */}
//         <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {features.map((feature) => (
//             <div
//               key={feature.title}
//               className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//             >
//               <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-orange-100 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
//                 {feature.icon}
//               </div>

//               <h3 className="mt-6 text-xl font-bold text-gray-900">
//                 {feature.title}
//               </h3>

//               <p className="mt-3 text-gray-600 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>       
//       </div>
//     </section>
//   );
// }



