import _ from "lodash";

export const useFormIsUpdated = (defaultValue, currentValue) => {
  return !_.isEqual(defaultValue, currentValue);
};

export default useFormIsUpdated;
