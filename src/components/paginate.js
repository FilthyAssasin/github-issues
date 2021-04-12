import _ from "lodash";

export function paginate(issues, currentPage, pageSize) {
  const startIndex = currentPage * pageSize;
  return _(issues).slice(startIndex).take(pageSize).value();
}
