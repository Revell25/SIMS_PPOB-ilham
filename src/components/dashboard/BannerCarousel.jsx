const BannerCarousel = ({ banners = [], loading = false }) => {
  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-32 w-full flex-1 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    )
  }

  if (!banners.length) {
    return null
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {banners.map((banner) => (
        <div
          key={banner.banner_name}
          className="w-full min-w-[280px] overflow-hidden rounded-2xl bg-white shadow-sm"
        >
          <img
            src={banner.banner_image}
            alt={banner.banner_name}
            className="h-32 w-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}

export default BannerCarousel
