import { useState } from "react"

const BRANDS = {
  sports: [
    { name: "Adidas", description: "Performance & Originals" },
    { name: "New Balance", description: "Factory store" },
    { name: "Asics", description: "Running & lifestyle" },
    { name: "Nike", description: "Factory Outlet" },
    { name: "Puma", description: "Sports shoes" },
    { name: "Under Armour", description: "Performance wear" },
    { name: "The North Face", description: "Outdoor clothing" },
    { name: "Columbia", description: "Outdoor gear" },
    { name: "Skechers", description: "Comfort shoes" },
    { name: "Onitsuka Tiger", description: "Japanese sneakers" },
  ],
  fashion: [
    { name: "Coach", description: "Leather goods" },
    { name: "Kate Spade", description: "Accessories" },
    { name: "Michael Kors", description: "Luxury" },
    { name: "Ralph Lauren", description: "American classic" },
    { name: "Tommy Hilfiger", description: "American casual" },
    { name: "Diesel", description: "Italian fashion" },
    { name: "Hugo Boss", description: "German fashion" },
    { name: "Brooks Brothers", description: "American classic" },
  ],
  japanese: [
    { name: "Beams", description: "Japanese fashion" },
    { name: "United Arrows", description: "Japanese fashion" },
    { name: "Moussy", description: "Japanese casual" },
    { name: "Sly", description: "Japanese fashion" },
  ],
}

const SALES = [
  {
    name: "Premium Outlets Day",
    period: "October 1-31, 2026",
    discount: "Special promotions",
  },
  {
    name: "November Sale",
    period: "November 6-15, 2026",
    discount: "Up to 70-80% OFF",
  },
  {
    name: "Black Friday",
    period: "November 20-29, 2026",
    discount: "Up to 70-80% OFF",
  },
]

type BrandCategory = "sports" | "fashion" | "japanese"

export function OutletSidebar() {
  const [activeTab, setActiveTab] = useState<BrandCategory>("sports")
  const [showSales, setShowSales] = useState(false)

  return (
    <div className="rounded-xl bg-brown-900/70 border border-brown-800/50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-brown-800/50">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛍️</span>
          <div>
            <h3 className="text-sm font-bold text-brown-100">
              Rinku Premium Outlets
            </h3>
            <p className="text-xs text-brown-500">250 stores • Near KIX Airport</p>
          </div>
        </div>
      </div>

      {/* Brand Tabs */}
      <div className="flex border-b border-brown-800/50">
        {(["sports", "fashion", "japanese"] as BrandCategory[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === tab
                ? "text-brown-100 bg-brown-800/60"
                : "text-brown-500 hover:text-brown-300"
            }`}
          >
            {tab === "sports" ? "🏃 Sports" : tab === "fashion" ? "👗 Fashion" : "🇯🇵 Japanese"}
          </button>
        ))}
      </div>

      {/* Brand List */}
      <div className="px-4 py-3 max-h-48 overflow-y-auto">
        <div className="space-y-2">
          {BRANDS[activeTab].map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-between py-1.5"
            >
              <span className="text-sm text-brown-200 font-medium">
                {brand.name}
              </span>
              <span className="text-xs text-brown-500">{brand.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* October Sales */}
      <div className="border-t border-brown-800/50">
        <button
          onClick={() => setShowSales(!showSales)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-brown-900/40 transition-colors"
        >
          <span className="flex items-center gap-2">
            <span className="text-amber-500">📅</span>
            <span className="text-sm font-medium text-brown-200">
              October 2026 Sales
            </span>
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`text-brown-500 transition-transform ${showSales ? "rotate-180" : ""}`}
          >
            <path d="M5 7.5L10 12.5L15 7.5" />
          </svg>
        </button>

        {showSales && (
          <div className="px-4 pb-3 space-y-2">
            {SALES.map((sale) => (
              <div
                key={sale.name}
                className="rounded-lg bg-brown-950/50 px-3 py-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-brown-200">
                    {sale.name}
                  </span>
                  <span className="text-xs text-amber-500 font-medium">
                    {sale.discount}
                  </span>
                </div>
                <span className="text-xs text-brown-500">{sale.period}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tax-Free Info */}
      <div className="px-4 py-3 border-t border-brown-800/50 bg-brown-900/30">
        <div className="flex items-start gap-2">
          <span className="text-sm">tax-free</span>
          <p className="text-xs text-brown-400">
            Show passport at checkout for 10% tax exemption
          </p>
        </div>
      </div>
    </div>
  )
}
