import moment from "moment";

export const formatDate = (dateString) =>
  moment(dateString).format("DD MMM YYYY");
