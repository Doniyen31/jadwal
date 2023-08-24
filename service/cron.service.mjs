import cron from "node-cron";

export const publishTask = async () => {
  const date = new Date();

  console.log(
    `This script running every minutes - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
};
