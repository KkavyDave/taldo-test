import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, Bell } from "lucide-react";

// Define the shape of a single webinar based on your DB model
export interface LiveWebinarType {
  id: string;
  title: string;
  date: Date;
  image: string;
  link: string | null;
}

interface UpcomingWebinarsProps {
  webinars: LiveWebinarType[];
  showEmptyMessage?: boolean; // <--- NEW PROP (Optional)
}

export default function UpcomingWebinars({ webinars, showEmptyMessage = false }: UpcomingWebinarsProps) {
  
  // 1. HANDLE EMPTY STATE
  if (!webinars || webinars.length === 0) {
    if (showEmptyMessage) {
      // Logic: If on Webinar page, show "Stay Tuned" card
      return (
        <section className="w-full bg-gray-50 py-12 md:py-20">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20 text-center">
            <div className="bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-gray-100 flex flex-col items-center max-w-2xl mx-auto">
               <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-[#5E72E4] mb-6">
                 <Bell className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-bold text-[#2B3656] mb-3">No Upcoming Webinars</h3>
               <p className="text-gray-500 mb-8 max-w-md mx-auto">
                 We are currently planning our next session! Check back soon or follow us on social media for updates.
               </p>
               <Link href="/" className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors">
                 Back to Home
               </Link>
            </div>
          </div>
        </section>
      );
    }    // s
    // Logic: If on Home page (showEmptyMessage is false), hide entire section
    return null; 
  }

  // 2. NORMAL RENDER (If webinars exist)
  return (
    <section className="w-full bg-gray-50 pt-8 md:pt-12 pb-12 md:pb-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-20">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-gray-900 text-center md:text-left mb-2">
              Upcoming Webinars
            </h2>
            <p className="text-gray-600 text-sm md:text-base text-center md:text-left">
              Join our live sessions.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webinars.map((webinar) => (
            <div
              key={webinar.id}
              className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                <Image
                  src={webinar.image || "/placeholder.jpg"}
                  alt={webinar.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                  {webinar.title}
                </h3>

                <div className="flex flex-col gap-2 mb-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(webinar.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      {new Date(webinar.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                  </div>
                </div>

                {webinar.link && (
                  <div className="mt-auto">
                    <Link
                      href={webinar.link}
                      target="_blank"
                      className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold rounded-xl transition-colors"
                    >
                      Join Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}