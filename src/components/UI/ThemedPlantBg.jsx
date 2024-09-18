import React from "react";

// Vintage Theme
const VintagePlantBackground = ({ children }) => {
  return (
    <div className="font-serif relative min-h-screen overflow-hidden bg-[#f3e5d8]">
      {/* Vintage paper texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Animated vintage leaves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-vintage"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1}s`,
              animationDuration: `${20 + Math.random() * 10}s`,
            }}
          >
            <svg
              className="w-10 h-10 text-[#8B4513] opacity-30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M17 8C8 10 5 16 5 22M17 8C19 10 20 12 20 15M17 8C13 9 12 11 12 13M17 8C15 9 14 11 14 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[rgba(139,69,19,0.2)]"></div>

      {/* Content */}
      <div className="relative">{children}</div>

      {/* Add global styles */}
      <style jsx global>{`
        @keyframes float-vintage {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(20deg);
          }
        }
        .animate-float-vintage {
          animation: float-vintage 20s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Earthy Theme
const EarthyPlantBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Main earthy background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#D2691E]"></div>

      {/* Animated earthy elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-earthy"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${18 + Math.random() * 10}s`,
            }}
          >
            <svg
              className="w-8 h-8 text-[#F4A460] opacity-20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Soil texture */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#3E2723] to-transparent"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Add global styles */}
      <style jsx global>{`
        @keyframes float-earthy {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(15deg);
          }
        }
        .animate-float-earthy {
          animation: float-earthy 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

// Green Theme
const GreenPlantBackground = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Main green background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-green-400 to-green-600"></div>

      {/* Animated green leaves */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-green"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${12 + Math.random() * 8}s`,
            }}
          >
            <svg
              className="w-6 h-6 text-green-800 opacity-30"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.88 2.15L20.68 2.55L18.2 4.37L15.26 3.87L14.14 5.18L17.03 6.69L15.55 8.35L14.89 11.31L16.31 12.32L17.85 9.92L19.97 8.89L21.52 6.93L21.88 2.15Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Grass texture at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-800 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Add global styles */}
      <style jsx global>{`
        @keyframes float-green {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(20deg);
          }
        }
        .animate-float-green {
          animation: float-green 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export { VintagePlantBackground, EarthyPlantBackground, GreenPlantBackground };
