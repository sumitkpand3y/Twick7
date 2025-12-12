import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Calendar,
  MapPin,
  Car,
  Wrench,
  Camera,
  FileText,
  CheckCircle,
  CreditCard,
  Truck,
  ArrowDown,
  Zap,
  Star,
  Clock,
  Menu,
  X,
  StepForward,
} from "lucide-react";

const ResponsiveScrollWorkflow = () => {
  const [activeSteps, setActiveSteps] = useState(new Set());
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [visitedSteps, setVisitedSteps] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const containerRef = useRef(null);
  const stepRefs = useRef([]);
  const lastScrollDirection = useRef("down");
  const scrollMemory = useRef(new Map());
  const scrollMemoryRef = useRef(new Map());

  const workflowSteps = [
    {
      id: 1,
      title: "Schedule an Appointment",
      shortTitle: "Schedule",
      shortDesc: "Book online in minutes",
      icon: Calendar,
      gradient: "from-blue-400 via-blue-500 to-blue-600",
      accentColor: "blue",
      bgPattern:
        "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
      description:
        "Visit https://tweak7garage.com/ and click 'Schedule Appointment'. Fill out the form with your car make, model, odometer reading, and describe any issues. Submit to request your appointment slot.",
      duration: "2 mins",
      features: [
        "Online booking",
        "Instant confirmation",
        "Flexible scheduling",
      ],
    },
    {
      id: 2,
      title: "Service Pickup Assignment",
      shortTitle: "Assignment",
      shortDesc: "We assign pickup slot",
      icon: MapPin,
      gradient: "from-emerald-400 via-emerald-500 to-emerald-600",
      accentColor: "emerald",
      bgPattern:
        "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
      description:
        "Our intelligent system assigns a service pickup slot based on your location and preferences. You'll receive instant confirmation with pickup date and time details.",
      duration: "1 hour",
      features: ["Smart scheduling", "Location-based", "SMS confirmation"],
    },
    {
      id: 3,
      title: "Professional Car Pickup",
      shortTitle: "Pickup",
      shortDesc: "Driver picks up car",
      icon: Truck,
      gradient: "from-purple-400 via-purple-500 to-purple-600",
      accentColor: "purple",
      bgPattern:
        "radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
      description:
        "Our professional driver arrives punctually at your location. We take detailed photos of your vehicle's condition before pickup to ensure transparency and accountability.",
      duration: "30 mins",
      features: [
        "Punctual service",
        "Photo documentation",
        "Professional drivers",
      ],
    },
    {
      id: 4,
      title: "Secure Garage Reception",
      shortTitle: "Reception",
      shortDesc: "Safe garage arrival",
      icon: Car,
      gradient: "from-orange-400 via-orange-500 to-orange-600",
      accentColor: "orange",
      bgPattern:
        "radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)",
      description:
        "Your vehicle is safely transported to our state-of-the-art service center. Our reception team logs the vehicle and ensures it's securely stored in our facility.",
      duration: "1 hour",
      features: ["Secure facility", "Vehicle logging", "Safe transport"],
    },
    {
      id: 5,
      title: "Comprehensive Video Inspection",
      shortTitle: "Inspection",
      shortDesc: "Video documentation",
      icon: Camera,
      gradient: "from-red-400 via-red-500 to-red-600",
      accentColor: "red",
      bgPattern:
        "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)",
      description:
        "Our certified technicians perform a thorough multi-point inspection. We create detailed videos showing your vehicle's current condition, identifying issues and potential improvements.",
      duration: "45 mins",
      features: ["Video documentation", "Multi-point check", "Expert analysis"],
    },
    {
      id: 6,
      title: "Transparent Quotation",
      shortTitle: "Quotation",
      shortDesc: "Detailed pricing",
      icon: FileText,
      gradient: "from-yellow-400 via-yellow-500 to-yellow-600",
      accentColor: "yellow",
      bgPattern:
        "radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)",
      description:
        "Based on our inspection, we generate a comprehensive quotation with itemized costs for parts and labor. No hidden charges - complete transparency in pricing.",
      duration: "15 mins",
      features: ["Itemized pricing", "No hidden costs", "Digital quotation"],
    },
    {
      id: 7,
      title: "Expert Service Execution",
      shortTitle: "Service",
      shortDesc: "Quality workmanship",
      icon: Wrench,
      gradient: "from-indigo-400 via-indigo-500 to-indigo-600",
      accentColor: "indigo",
      bgPattern:
        "radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
      description:
        "After your approval, our skilled technicians begin work using genuine parts. We document the entire process with before, during, and after photos for complete transparency.",
      duration: "2-6 hours",
      features: ["Genuine parts", "Photo updates", "Skilled technicians"],
    },
    {
      id: 8,
      title: "Quality Check & Invoice",
      shortTitle: "Quality Check",
      shortDesc: "Final inspection",
      icon: CheckCircle,
      gradient: "from-teal-400 via-teal-500 to-teal-600",
      accentColor: "teal",
      bgPattern:
        "radial-gradient(circle at 60% 40%, rgba(20, 184, 166, 0.15) 0%, transparent 50%)",
      description:
        "Comprehensive quality check ensures everything meets our standards. We send a detailed invoice with service breakdown. Pay securely through our encrypted payment system.",
      duration: "10 mins",
      features: ["Quality assurance", "Detailed invoice", "Secure payment"],
    },
    {
      id: 9,
      title: "Convenient Vehicle Return",
      shortTitle: "Return",
      shortDesc: "Doorstep delivery",
      icon: CreditCard,
      gradient: "from-pink-400 via-pink-500 to-pink-600",
      accentColor: "pink",
      bgPattern:
        "radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
      description:
        "After payment confirmation, we schedule the return delivery. Your freshly serviced vehicle is delivered back to your location with final condition photos and service summary.",
      duration: "30 mins",
      features: ["Doorstep delivery", "Service summary", "Final documentation"],
    },
  ];

  // Throttle function for performance
  const throttle = useCallback((func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }, []);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Enhanced scroll handling with memory
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerHeight = container.scrollHeight - window.innerHeight;
    const scrolled = Math.max(0, -containerRect.top);
    const progress = Math.min(100, (scrolled / containerHeight) * 100);

    setScrollProgress(progress);

    // Detect scroll direction
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const direction =
      currentScroll > (scrollMemoryRef.current.get("lastScroll") || 0)
        ? "down"
        : "up";
    lastScrollDirection.current = direction;
    scrollMemoryRef.current.set("lastScroll", currentScroll);

    // Enhanced step detection with memory
    const newActiveSteps = new Set();
    const newVisitedSteps = new Set(visitedSteps);

    stepRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const centerThreshold = isMobile ? 0.6 : 0.5;
        const isInView =
          rect.top < window.innerHeight * centerThreshold &&
          rect.bottom > window.innerHeight * (1 - centerThreshold);
        const isAboveView = rect.bottom < window.innerHeight * centerThreshold;

        const stepId = index + 1;

        if (isInView) {
          newActiveSteps.add(stepId);
          newVisitedSteps.add(stepId);
          scrollMemoryRef.current.set(`step_${stepId}`, {
            visited: true,
            timestamp: Date.now(),
            direction: direction,
          });
        }
      }
    });

    // Smart completion logic based on scroll direction and memory
    const newCompletedSteps = new Set(completedSteps);
    stepRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const isAboveView =
          rect.bottom < window.innerHeight * (isMobile ? 0.6 : 0.5);
        const stepId = index + 1;

        if (direction === "down" && isAboveView) {
          newCompletedSteps.add(stepId);
        } else if (
          direction === "up" &&
          scrollMemoryRef.current.has(`step_${stepId}`)
        ) {
          // Maintain completion state when scrolling up if step was previously visited
          const stepMemory = scrollMemoryRef.current.get(`step_${stepId}`);
          if (stepMemory && stepMemory.visited) {
            newCompletedSteps.add(stepId);
          }
        }
      }
    });

    // Preserve state when scrolling back up
    if (direction === "up") {
      visitedSteps.forEach((stepId) => {
        if (
          !newActiveSteps.has(stepId) &&
          scrollMemoryRef.current.has(`step_${stepId}`)
        ) {
          newCompletedSteps.add(stepId);
        }
      });
    }

    setActiveSteps(newActiveSteps);
    setCompletedSteps(newCompletedSteps);
    setVisitedSteps(newVisitedSteps);
  }, [isMobile]); // Removed completedSteps and visitedSteps dependencies

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 16); // 60fps
    window.addEventListener("scroll", throttledScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [handleScroll, throttle]);

  const setStepRef = (index) => (el) => {
    stepRefs.current[index] = el;
  };

  const scrollToStep = (stepId) => {
    const stepIndex = stepId - 1;
    if (stepRefs.current[stepIndex]) {
      stepRefs.current[stepIndex].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setShowMobileNav(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"
    >
      {/* Fixed Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <>
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="fixed top-3 right-12 z-50 bg-black/30 backdrop-blur-sm rounded-full p-3 text-white"
          >
            {showMobileNav ? (
              <X className="w-5 h-5" />
            ) : (
              <StepForward className="w-5 h-5" />
            )}
          </button>

          {showMobileNav && (
            <div className="fixed top-0 right-0 w-80 h-full bg-black/90 backdrop-blur-lg z-40 p-6 overflow-y-auto">
              <div className="mt-16">
                <h3 className="text-white font-bold mb-4">Process Steps</h3>
                <div className="space-y-2">
                  {workflowSteps.map((step) => {
                    const IconComponent = step.icon;
                    const isActive = activeSteps.has(step.id);
                    const isCompleted = completedSteps.has(step.id);
                    const wasVisited = visitedSteps.has(step.id);

                    return (
                      <button
                        key={step.id}
                        onClick={() => scrollToStep(step.id)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-white/20 border border-white/30"
                            : isCompleted || wasVisited
                            ? "bg-white/10 border border-white/20"
                            : "bg-white/5 border border-white/10"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isActive
                              ? `bg-gradient-to-br ${step.gradient}`
                              : "bg-white/10"
                          }`}
                        >
                          <IconComponent
                            className={`w-4 h-4 ${
                              isActive || isCompleted || wasVisited
                                ? "text-white"
                                : "text-white/60"
                            }`}
                          />
                        </div>
                        <div className="text-left">
                          <div
                            className={`text-sm font-medium ${
                              isActive || isCompleted || wasVisited
                                ? "text-white"
                                : "text-white/60"
                            }`}
                          >
                            {step.shortTitle}
                          </div>
                          <div className="text-xs text-white/50">
                            {step.duration}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Desktop Step Counter */}
      {!isMobile && (
        <div className="fixed top-4 right-4 bg-black/30 backdrop-blur-sm rounded-2xl px-4 py-2 z-40">
          <div className="flex items-center gap-2 text-white">
            <div className="text-sm font-medium">
              {Math.max(completedSteps.size, visitedSteps.size)}/
              {workflowSteps.length}
            </div>
            <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
                style={{
                  width: `${
                    (Math.max(completedSteps.size, visitedSteps.size) /
                      workflowSteps.length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 md:w-64 h-32 md:h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-32 md:w-64 h-32 md:h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero Section - Responsive */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 md:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3 mb-4 md:mb-6">
              <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-400" />
              <span className="text-white font-medium text-sm md:text-base">
                Premium Car Service Experience
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 md:mb-6">
              How We Work
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12 px-4">
              Discover our seamless 9-step process that transforms car servicing
              into a transparent, convenient, and trustworthy experience.
            </p>
          </div>

          <div className="animate-bounce">
            <ArrowDown className="w-6 md:w-8 h-6 md:h-8 text-white/60" />
          </div>
          <p className="text-white/40 mt-4 text-xs md:text-sm">
            {isMobile
              ? "Scroll or tap menu to explore"
              : "Scroll to explore each step"}
          </p>
        </div>

        {/* Steps Timeline - Responsive */}
        <div className="relative px-4 md:px-8">
          {/* Central Timeline - Responsive */}
          <div
            className={`absolute ${
              isMobile ? "left-8" : "left-1/2 transform -translate-x-1/2"
            } top-0 bottom-0 w-1 bg-white/20 rounded-full`}
          ></div>
          <div
            className={`absolute ${
              isMobile ? "left-8" : "left-1/2 transform -translate-x-1/2"
            } top-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-1000`}
            style={{
              height: `${
                (Math.max(completedSteps.size, visitedSteps.size) /
                  workflowSteps.length) *
                100
              }%`,
            }}
          ></div>

          {workflowSteps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = activeSteps.has(step.id);
            const isCompleted = completedSteps.has(step.id);
            const wasVisited = visitedSteps.has(step.id);
            const isLeft = !isMobile && index % 2 === 0;

            return (
              <div
                key={step.id}
                ref={setStepRef(index)}
                className={`relative ${
                  isMobile ? "min-h-screen" : "min-h-screen"
                } flex items-center py-10 md:py-20`}
              >
                {/* Step Node - Responsive */}
                <div
                  className={`absolute ${
                    isMobile
                      ? "left-8 transform -translate-x-1/2"
                      : "left-1/2 transform -translate-x-1/2"
                  } z-20`}
                >
                  <div
                    className={`w-12 md:w-16 lg:w-20 h-12 md:h-16 lg:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center transition-all duration-700 ${
                      isActive
                        ? `bg-gradient-to-br ${step.gradient} shadow-2xl scale-110`
                        : isCompleted || wasVisited
                        ? `bg-gradient-to-br ${step.gradient} shadow-lg`
                        : "bg-white/10 backdrop-blur-sm scale-90"
                    }`}
                    style={{
                      boxShadow: isActive
                        ? `0 0 30px 5px ${getShadowColor(step.accentColor)}`
                        : "",
                    }}
                  >
                    <IconComponent
                      className={`w-5 md:w-6 lg:w-8 h-5 md:h-6 lg:h-8 transition-all duration-300 ${
                        isActive || isCompleted || wasVisited
                          ? "text-white"
                          : "text-white/40"
                      }`}
                    />
                  </div>

                  {/* Step Number - Responsive */}
                  <div
                    className={`absolute -top-1 md:-top-2 -right-1 md:-right-2 w-6 md:w-8 h-6 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all duration-300 ${
                      isActive || isCompleted || wasVisited
                        ? "bg-white text-gray-900"
                        : "bg-white/20 text-white/60"
                    }`}
                  >
                    {step.id}
                  </div>
                </div>

                {/* Content Card - Responsive */}
                <div
                  className={`w-full ${
                    isMobile
                      ? "pl-20 pr-4"
                      : `max-w-lg ${isLeft ? "mr-auto pr-20" : "ml-auto pl-20"}`
                  }`}
                >
                  <div
                    className={`relative bg-white/5 backdrop-blur-lg rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden transition-all duration-700 ${
                      isActive
                        ? "shadow-2xl scale-105 border-white/20"
                        : isCompleted || wasVisited
                        ? "shadow-lg shadow-white/5"
                        : "opacity-60 scale-95"
                    }`}
                    style={{
                      background: step.bgPattern,
                      boxShadow: isActive
                        ? "0 0 30px 5px rgba(255, 255, 255, 0.1)"
                        : "",
                    }}
                  >
                    {/* Header - Responsive */}
                    <div className="p-4 md:p-6 lg:p-8">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <div
                          className={`px-2 md:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${getAccentColorClass(
                            step.accentColor
                          )}`}
                        >
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </div>
                        <div
                          className={`w-2 md:w-3 h-2 md:h-3 rounded-full ${
                            isCompleted || (wasVisited && !isActive)
                              ? "bg-green-400"
                              : isActive
                              ? "bg-yellow-400 animate-pulse"
                              : "bg-white/20"
                          }`}
                        ></div>
                      </div>

                      <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 md:mb-3">
                        {isMobile ? step.shortTitle : step.title}
                      </h3>
                      <p className="text-white/70 text-sm md:text-base lg:text-lg mb-4 md:mb-6">
                        {step.shortDesc}
                      </p>

                      <div
                        className={`transition-all duration-700 ${
                          isActive
                            ? "opacity-100 max-h-96"
                            : "opacity-0 max-h-0"
                        } overflow-hidden`}
                      >
                        <p className="text-white/60 text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                          {step.description}
                        </p>

                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {step.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="px-2 md:px-3 py-1 bg-white/10 rounded-full text-xs text-white/80"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="h-1 bg-white/10">
                      <div
                        className={`h-full bg-gradient-to-r ${
                          step.gradient
                        } transition-all duration-1000 ${
                          isCompleted || wasVisited
                            ? "w-full"
                            : isActive
                            ? "w-2/3"
                            : "w-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA Section - Responsive */}
        <div className="min-h-screen flex items-center justify-center px-4 md:px-8">
          <div className="text-center">
            <div className="mb-6 md:mb-8">
              <Zap className="w-12 md:w-16 h-12 md:h-16 text-yellow-400 mx-auto mb-4 md:mb-6" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
                Ready to Experience Excellence?
              </h2>
              <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-8 md:mb-12">
                Join thousands of satisfied customers who trust us with their
                vehicles. Experience our transparent, professional, and
                convenient service today.
              </p>
            </div>

            <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 md:px-12 py-4 md:py-6 rounded-full font-bold text-lg md:text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 md:gap-3">
              <Calendar className="w-5 md:w-6 h-5 md:h-6" />
              Schedule Your Service Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for dynamic color classes
const getShadowColor = (color) => {
  const colorMap = {
    blue: "rgba(59, 130, 246, 0.5)",
    emerald: "rgba(16, 185, 129, 0.5)",
    purple: "rgba(147, 51, 234, 0.5)",
    orange: "rgba(249, 115, 22, 0.5)",
    red: "rgba(239, 68, 68, 0.5)",
    yellow: "rgba(245, 158, 11, 0.5)",
    indigo: "rgba(99, 102, 241, 0.5)",
    teal: "rgba(20, 184, 166, 0.5)",
    pink: "rgba(236, 72, 153, 0.5)",
  };
  return colorMap[color] || "rgba(255, 255, 255, 0.5)";
};

const getAccentColorClass = (color) => {
  const colorMap = {
    blue: "bg-blue-500/20 text-blue-300",
    emerald: "bg-emerald-500/20 text-emerald-300",
    purple: "bg-purple-500/20 text-purple-300",
    orange: "bg-orange-500/20 text-orange-300",
    red: "bg-red-500/20 text-red-300",
    yellow: "bg-yellow-500/20 text-yellow-300",
    indigo: "bg-indigo-500/20 text-indigo-300",
    teal: "bg-teal-500/20 text-teal-300",
    pink: "bg-pink-500/20 text-pink-300",
  };
  return colorMap[color] || "bg-white/10 text-white/60";
};

export default ResponsiveScrollWorkflow;
