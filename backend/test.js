console.log("TEST: Node.js is working!");
console.log("TEST: About to require express...");

try {
    const express = require("express");
    console.log("TEST: Express loaded successfully");
} catch(e) {
    console.error("TEST: ERROR loading express:", e.message);
}

console.log("TEST: Done");
