"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, MapPin, Clock, Route } from "lucide-react"
import { format, isSameDay } from "date-fns"
import dynamic from "next/dynamic"

const CalendarNoSSR = dynamic(() => import("@/components/ui/calendar").then((m) => m.Calendar), { ssr: false })

// Marathon events happening in India - Extended through 2025
const createSampleEvents = () => [
  // December 2024
  {
    id: 1,
    title: "Goa River Marathon",
    date: "2024-12-08",
    time: "6:30 AM",
    category: "marathon",
    color: "bg-teal-500",
    location: "Goa",
    distance: "42.2 KM",
  },
  {
    id: 2,
    title: "Bengaluru Marathon",
    date: "2024-12-15",
    time: "5:00 AM",
    category: "marathon",
    color: "bg-green-500",
    location: "Bengaluru, Karnataka",
    distance: "42.2 KM",
  },
  {
    id: 3,
    title: "Delhi Half Marathon",
    date: "2024-12-29",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-blue-500",
    location: "New Delhi",
    distance: "21.1 KM",
  },

  // January 2025
  {
    id: 4,
    title: "Kochi Marathon",
    date: "2025-01-05",
    time: "5:30 AM",
    category: "marathon",
    color: "bg-cyan-500",
    location: "Kochi, Kerala",
    distance: "42.2 KM",
  },
  {
    id: 5,
    title: "Jaipur Marathon",
    date: "2025-01-12",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-yellow-500",
    location: "Jaipur, Rajasthan",
    distance: "42.2 KM",
  },
  {
    id: 6,
    title: "Mumbai Marathon",
    date: "2025-01-19",
    time: "5:30 AM",
    category: "marathon",
    color: "bg-red-500",
    location: "Mumbai, Maharashtra",
    distance: "42.2 KM",
  },
  {
    id: 7,
    title: "Pune International Marathon",
    date: "2025-01-26",
    time: "5:30 AM",
    category: "marathon",
    color: "bg-orange-500",
    location: "Pune, Maharashtra",
    distance: "42.2 KM",
  },

  // February 2025
  {
    id: 8,
    title: "Kolkata Marathon",
    date: "2025-02-02",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-indigo-500",
    location: "Kolkata, West Bengal",
    distance: "42.2 KM",
  },
  {
    id: 9,
    title: "Hyderabad Marathon",
    date: "2025-02-09",
    time: "5:00 AM",
    category: "marathon",
    color: "bg-purple-500",
    location: "Hyderabad, Telangana",
    distance: "42.2 KM",
  },
  {
    id: 10,
    title: "Chennai Marathon",
    date: "2025-02-16",
    time: "5:30 AM",
    category: "marathon",
    color: "bg-pink-500",
    location: "Chennai, Tamil Nadu",
    distance: "42.2 KM",
  },
  {
    id: 11,
    title: "Ahmedabad Marathon",
    date: "2025-02-23",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-emerald-500",
    location: "Ahmedabad, Gujarat",
    distance: "42.2 KM",
  },

  // March 2025
  {
    id: 12,
    title: "Lucknow Marathon",
    date: "2025-03-02",
    time: "6:30 AM",
    category: "marathon",
    color: "bg-violet-500",
    location: "Lucknow, Uttar Pradesh",
    distance: "42.2 KM",
  },
  {
    id: 13,
    title: "Bhopal Marathon",
    date: "2025-03-09",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-rose-500",
    location: "Bhopal, Madhya Pradesh",
    distance: "42.2 KM",
  },
  {
    id: 14,
    title: "Chandigarh Marathon",
    date: "2025-03-16",
    time: "6:30 AM",
    category: "marathon",
    color: "bg-amber-500",
    location: "Chandigarh",
    distance: "42.2 KM",
  },
  {
    id: 15,
    title: "Nagpur Marathon",
    date: "2025-03-23",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-lime-500",
    location: "Nagpur, Maharashtra",
    distance: "42.2 KM",
  },

  // April 2025
  {
    id: 16,
    title: "Coimbatore Marathon",
    date: "2025-04-06",
    time: "5:30 AM",
    category: "marathon",
    color: "bg-sky-500",
    location: "Coimbatore, Tamil Nadu",
    distance: "42.2 KM",
  },
  {
    id: 17,
    title: "Surat Marathon",
    date: "2025-04-13",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-fuchsia-500",
    location: "Surat, Gujarat",
    distance: "42.2 KM",
  },
  {
    id: 18,
    title: "Thiruvananthapuram Marathon",
    date: "2025-04-20",
    time: "5:30 AM",
    category: "marathon",
    color: "bg-slate-500",
    location: "Thiruvananthapuram, Kerala",
    distance: "42.2 KM",
  },

  // May 2025
  {
    id: 19,
    title: "Shimla Hill Marathon",
    date: "2025-05-04",
    time: "7:00 AM",
    category: "marathon",
    color: "bg-stone-500",
    location: "Shimla, Himachal Pradesh",
    distance: "42.2 KM",
  },
  {
    id: 20,
    title: "Dehradun Marathon",
    date: "2025-05-11",
    time: "6:30 AM",
    category: "marathon",
    color: "bg-neutral-500",
    location: "Dehradun, Uttarakhand",
    distance: "42.2 KM",
  },
  {
    id: 21,
    title: "Mysore Marathon",
    date: "2025-05-18",
    time: "5:30 AM",
    category: "marathon",
    color: "bg-zinc-500",
    location: "Mysore, Karnataka",
    distance: "42.2 KM",
  },

  // October 2025 (Post-monsoon season)
  {
    id: 22,
    title: "Vadodara Marathon",
    date: "2025-10-05",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-red-600",
    location: "Vadodara, Gujarat",
    distance: "42.2 KM",
  },
  {
    id: 23,
    title: "Indore Marathon",
    date: "2025-10-12",
    time: "6:30 AM",
    category: "marathon",
    color: "bg-blue-600",
    location: "Indore, Madhya Pradesh",
    distance: "42.2 KM",
  },
  {
    id: 24,
    title: "Visakhapatnam Marathon",
    date: "2025-10-19",
    time: "5:30 AM",
    category: "marathon",
    color: "bg-green-600",
    location: "Visakhapatnam, Andhra Pradesh",
    distance: "42.2 KM",
  },
  {
    id: 25,
    title: "Patna Marathon",
    date: "2025-10-26",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-purple-600",
    location: "Patna, Bihar",
    distance: "42.2 KM",
  },

  // November 2025
  {
    id: 26,
    title: "Guwahati Marathon",
    date: "2025-11-02",
    time: "6:30 AM",
    category: "marathon",
    color: "bg-pink-600",
    location: "Guwahati, Assam",
    distance: "42.2 KM",
  },
  {
    id: 27,
    title: "Bhubaneswar Marathon",
    date: "2025-11-09",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-orange-600",
    location: "Bhubaneswar, Odisha",
    distance: "42.2 KM",
  },
  {
    id: 28,
    title: "Ranchi Marathon",
    date: "2025-11-16",
    time: "6:30 AM",
    category: "marathon",
    color: "bg-teal-600",
    location: "Ranchi, Jharkhand",
    distance: "42.2 KM",
  },
  {
    id: 29,
    title: "Raipur Marathon",
    date: "2025-11-23",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-cyan-600",
    location: "Raipur, Chhattisgarh",
    distance: "42.2 KM",
  },
  {
    id: 30,
    title: "Jammu Marathon",
    date: "2025-11-30",
    time: "7:00 AM",
    category: "marathon",
    color: "bg-yellow-600",
    location: "Jammu, Jammu & Kashmir",
    distance: "42.2 KM",
  },

  // December 2025
  {
    id: 31,
    title: "Agra Marathon",
    date: "2025-12-07",
    time: "6:30 AM",
    category: "marathon",
    color: "bg-indigo-600",
    location: "Agra, Uttar Pradesh",
    distance: "42.2 KM",
  },
  {
    id: 32,
    title: "Jodhpur Marathon",
    date: "2025-12-14",
    time: "6:00 AM",
    category: "marathon",
    color: "bg-violet-600",
    location: "Jodhpur, Rajasthan",
    distance: "42.2 KM",
  },
  {
    id: 33,
    title: "Mangalore Marathon",
    date: "2025-12-21",
    time: "5:30 AM",
    category: "marathon",
    color: "bg-rose-600",
    location: "Mangalore, Karnataka",
    distance: "42.2 KM",
  },
]

// Month gradient themes inspired by the design
const monthThemes = {
  0: "from-blue-400 via-blue-500 to-blue-600", // January
  1: "from-pink-400 via-pink-500 to-pink-600", // February
  2: "from-green-400 via-green-500 to-green-600", // March
  3: "from-yellow-400 via-yellow-500 to-yellow-600", // April
  4: "from-orange-400 via-orange-500 to-orange-600", // May
  5: "from-red-400 via-red-500 to-red-600", // June
  6: "from-purple-400 via-purple-500 to-purple-600", // July
  7: "from-indigo-400 via-indigo-500 to-indigo-600", // August
  8: "from-teal-400 via-teal-500 to-teal-600", // September
  9: "from-cyan-400 via-cyan-500 to-cyan-600", // October
  10: "from-blue-500 via-indigo-500 to-purple-600", // November
  11: "from-purple-500 via-violet-500 to-indigo-600", // December
} as const

export default function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  // Memoize the events with proper Date objects
  const sampleEvents = useMemo(() => {
    return createSampleEvents().map((event) => ({
      ...event,
      date: new Date(event.date),
    }))
  }, [])

  const getEventsForDate = (date: Date) => {
    return sampleEvents.filter((event) => isSameDay(event.date, date))
  }

  const getUpcomingEvents = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return sampleEvents
      .filter((event) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)
        return eventDate >= today
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5)
  }

  const selectedDateEvents = getEventsForDate(selectedDate)
  const upcomingEvents = getUpcomingEvents()

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth)
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
  }

  const currentMonthGradient = monthThemes[currentMonth.getMonth() as keyof typeof monthThemes]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center sm:justify-start h-14 sm:h-16">
            <h1 className="text-lg sm:text-2xl font-black tracking-tight bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent uppercase">
              Running Ninja
            </h1>
          </div>
        </div>
      </header>

      {/* Single Calendar Card */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
          {/* Calendar Section - Top Half with Left-Right Layout */}
          <div className={`bg-gradient-to-br ${currentMonthGradient} p-6 sm:p-8 relative overflow-hidden`}>
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 opacity-10">
              <div className="w-full h-full bg-white rounded-full transform translate-x-16 -translate-y-16 sm:translate-x-32 sm:-translate-y-32"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 opacity-10">
              <div className="w-full h-full bg-white rounded-full transform -translate-x-12 translate-y-12 sm:-translate-x-24 sm:translate-y-24"></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              {/* Calendar - Left Side */}
              <div className="flex-shrink-0 w-full md:w-auto">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6 w-full max-w-md">
                  <div className="text-left flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{format(currentMonth, "MMMM")}</h2>
                    <p className="text-white/80 text-sm sm:text-base">{format(currentMonth, "yyyy")}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth("prev")}
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-white hover:bg-white/20 rounded-full"
                    >
                      <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateMonth("next")}
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-white hover:bg-white/20 rounded-full"
                    >
                      <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="w-full max-w-md">
                  <CalendarNoSSR
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    month={currentMonth}
                    onMonthChange={setCurrentMonth}
                    className="rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-sm border-0 p-2 sm:p-3 w-full"
                    /* …keep the existing classNames & components props exactly the same… */
                    classNames={{
                      months: "text-white w-full",
                      month: "space-y-2 sm:space-y-3 w-full",
                      caption: "hidden",
                      table: "w-full border-collapse",
                      head_row: "flex w-full",
                      head_cell:
                        "text-white/70 rounded-md w-full font-normal text-xs sm:text-sm flex-1 text-center py-1",
                      row: "flex w-full mt-1",
                      cell: "text-center text-sm p-0 relative flex-1",
                      day: "h-6 w-6 sm:h-8 sm:w-8 p-0 font-normal text-white hover:bg-white/20 rounded-lg transition-colors mx-auto text-xs sm:text-sm",
                      day_selected: "bg-white text-gray-900 hover:bg-white/90 font-semibold shadow-lg scale-105",
                      day_today: "bg-white/20 text-white font-semibold",
                      day_outside: "text-white/30",
                      day_disabled: "text-white/30",
                    }}
                    components={{
                      Day: ({ date, ...props }) => {
                        const events = getEventsForDate(date)
                        const hasEvents = events.length > 0
                        const isSelected = isSameDay(date, selectedDate)
                        const isToday = isSameDay(date, new Date())

                        return (
                          <div className="relative">
                            <button
                              {...props}
                              onClick={(e) => {
                                e.preventDefault()
                                setSelectedDate(date)
                              }}
                              className={`
              h-6 w-6 sm:h-8 sm:w-8 p-0 font-normal rounded-lg transition-all duration-200 cursor-pointer text-xs sm:text-sm
              ${
                isSelected
                  ? "bg-white text-gray-900 hover:bg-white/90 font-semibold shadow-lg scale-105"
                  : "text-white hover:bg-white/20 active:bg-white/30"
              }
              ${isToday && !isSelected ? "bg-white/20 text-white font-semibold" : ""}
              ${hasEvents && !isSelected ? "ring-1 ring-white/40" : ""}
            `}
                            >
                              {format(date, "d")}
                            </button>
                            {hasEvents && (
                              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full opacity-90" />
                              </div>
                            )}
                          </div>
                        )
                      },
                    }}
                  />
                </div>
              </div>

              {/* Upcoming Events - Right Side */}
              <div className="flex-1 min-w-0 w-full md:w-auto">
                <div className="mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">Upcoming Marathons</h3>
                  <p className="text-white/80 text-xs sm:text-sm">Next 5 events</p>
                </div>

                <div className="space-y-1">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white/15 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedDate(event.date)}
                    >
                      <div className="flex items-start space-x-1.5">
                        <div className="flex-shrink-0">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${event.color} mt-1`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-0.5">
                            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate pr-1">
                              {event.title}
                            </h4>
                            <Badge
                              variant="secondary"
                              className="bg-white/20 text-white border-white/30 text-xs flex-shrink-0 px-1 py-0"
                            >
                              {event.distance}
                            </Badge>
                          </div>
                          <div className="space-y-0.5">
                            <div className="flex items-center space-x-1 text-white/90 text-xs">
                              <MapPin className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            <div className="flex items-center justify-between text-white/90 text-xs">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-2 w-2 sm:h-3 sm:w-3 flex-shrink-0" />
                                <span>{event.time}</span>
                              </div>
                              <span className="font-medium text-xs">{format(event.date, "MMM d")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Event Details Section - Bottom Half */}
          <div className={`bg-gradient-to-br ${currentMonthGradient} p-3 sm:p-4 relative overflow-hidden opacity-90`}>
            {/* Decorative Elements - Mirrored from top */}
            <div className="absolute top-0 left-0 w-24 h-24 sm:w-48 sm:h-48 opacity-10">
              <div className="w-full h-full bg-white rounded-full transform -translate-x-12 -translate-y-12 sm:-translate-x-24 sm:-translate-y-24"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-64 sm:h-64 opacity-10">
              <div className="w-full h-full bg-white rounded-full transform translate-x-16 translate-y-16 sm:translate-x-32 sm:translate-y-32"></div>
            </div>

            <div className="relative z-10">
              {selectedDateEvents.length > 0 ? (
                <div>
                  <div className="mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white text-center">
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </h3>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {selectedDateEvents.map((event) => (
                      <div
                        key={event.id}
                        className="bg-white/15 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-white/20 hover:bg-white/20 transition-all duration-200"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start space-x-3">
                            <div className={`w-4 h-4 rounded-full ${event.color} mt-1 flex-shrink-0`} />
                            <h4 className="text-base sm:text-lg font-bold text-white leading-tight">{event.title}</h4>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ml-7">
                            <div className="flex items-center space-x-2 text-white/90 text-xs sm:text-sm">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>

                            <div className="flex items-center space-x-2 text-white/90 text-xs sm:text-sm">
                              <Clock className="h-4 w-4 flex-shrink-0" />
                              <span>{event.time}</span>
                            </div>

                            <div className="flex items-center space-x-2 text-white/90 text-xs sm:text-sm">
                              <Route className="h-4 w-4 flex-shrink-0" />
                              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                {event.distance}
                              </Badge>
                            </div>
                          </div>

                          <div className="ml-7">
                            <Button
                              variant="outline"
                              className="w-full sm:w-auto text-sm py-2 px-6 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/40"
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 sm:py-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
                    {format(selectedDate, "EEEE, MMMM d, yyyy")}
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base mb-2">No marathons scheduled</p>
                  <p className="text-white/60 text-xs sm:text-sm">
                    Look for dates with white dots in the calendar to find events
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
