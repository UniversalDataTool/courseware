// Adds additional interface parameters for instructor on dataset
export default ({ interface: iface, samples }) => {
  return {
    interface:
      iface.type === "image_segmentation" ||
      iface.type === "image_pixel_segmentation"
        ? {
            ...iface,
            regionTypesAllowed: [
              "point",
              "bounding-box",
              "polygon",
              "allowed-area",
            ],
          }
        : iface,
    samples,
  }
}
