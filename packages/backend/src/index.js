"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var const_1 = require("./const");
var server_1 = require("./server");
server_1.default.listen(const_1.PORT, function () {
    console.log("listening on http://localhost:".concat(const_1.PORT));
});
