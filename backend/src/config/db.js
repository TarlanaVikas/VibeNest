const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  const dnsServers = process.env.MONGO_DNS_SERVERS
    ?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (dnsServers?.length) {
    dns.setServers(dnsServers);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("✅ MongoDB connected");
};

module.exports = connectDB;
