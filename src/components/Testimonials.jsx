import { FaStar } from "react-icons/fa";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Home Cook",
      image: "https://i.ibb.co/SwdYMP6d/Ellipse-1-3.png",
      feedback:
        "RecipeHub completely changed my cooking experience. The recipes are easy to follow and always delicious.",
    },
    {
      name: "Michael Brown",
      role: "Food Enthusiast",
      image: "https://i.ibb.co/QFw0r4yS/Ellipse-1-2.png",
      feedback:
        "I discovered so many amazing dishes here. It's now my go-to platform whenever I want to cook something new.",
    },
    {
      name: "Emily Davis",
      role: "Recipe Lover",
      image: "https://i.ibb.co/hF6KB5Gv/Ellipse-1-7.png",
      feedback:
        "The variety of recipes is incredible. I love how organized and beginner-friendly everything is.",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-extrabold text-gray-900">
            What Our Food Lovers Say
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Thousands of home cooks trust RecipeHub to discover, cook,
            and share amazing recipes every day.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >

              {/* Stars */}
              <div className="flex gap-1 text-orange-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Feedback */}
              <p className="mt-5 text-gray-600 leading-relaxed">
                “{item.feedback}”
              </p>

              {/* User */}
              <div className="mt-7 flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover border-2 border-orange-100"
                />

                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}