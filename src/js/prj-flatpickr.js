// Flatpickr
// const flatpickr = require("flatpickr"); 
//Note that importing the node files instead of using CDN changes the caldendar styles. Currently using CDN.

    const fp = flatpickr("#basicDate", {
        position: "above",
        enableTime: true,
        dateFormat: "F, d Y H:i",
        static: false
    });