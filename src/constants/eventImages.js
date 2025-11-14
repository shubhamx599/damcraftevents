// Event Images Data
export const eventImages = {
  corporate: [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    "https://images.unsplash.com/photo-1511578314322-379afb476865",
    "https://images.unsplash.com/photo-1551833993-eea000b6c5b1"
  ],
  mall: [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
  ],
  advertising: [
    "https://images.unsplash.com/photo-1563986768609-322da13575f3",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
    "https://images.unsplash.com/photo-1462826303086-329426d1aef5"
  ],
  road: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13",
    "https://images.unsplash.com/photo-1542224556-7c7b68668906"
  ]
};

export const getAllImages = () => {
  return Object.values(eventImages).flat();
};