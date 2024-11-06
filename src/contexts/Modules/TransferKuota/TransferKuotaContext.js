import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getBrach } from "../../../utils/jwt";
import { useParams } from "react-router-dom";
import _ from "lodash";
import useFormIsUpdated from "../../../hooks/useFormIsUpdated";

const TransferKuotaContext = createContext();

export const useTransferKuotaContext = () => useContext(TransferKuotaContext);

const TransferKuotaContextProvider = ({ children }) => {
  const [status, setStatus] = useState("On Hold");
  const [date, setDate] = useState(new Date());
  const [sourceBranchID, setSourceBranchID] = useState("");
  const [allocatedBranchID, setAllocatedBranchID] = useState("");
  const [fromWarehouseID, setFromWarehouseID] = useState("");
  const [allocatedWarehouseID, setAllocatedWarehouseID] = useState("");
  const [description, setDescription] = useState("");
  const [createdByID, setCreatedByID] = useState("");

  const [rejectReason, setRejectReason] = useState("");
  const [approveReason, setApproveReason] = useState("");
  const [reject, setreject] = useState(false);
  const [approve, setApprove] = useState(false);
  const [openSourceWarehouse, setOpenSourceWarehouse] = useState(false);
  const [openAllocatedWarehouse, setOpenAllocatedWarehouse] = useState(false);
  const [openRefNbr, setOpenRefNbr] = useState(false);
  const [openMutasiKuota, setOpenMutasiKuota] = useState(false);

  const [transferKuotaDetailSourceRep, setTransferKuotaDetailSourceRep] =
    useState([]);
  const [
    transferKuotaSourceDetailTransferRep,
    setTransferKuotaSourceDetailTransferRep,
  ] = useState([]);

  const [approvedByID, setApprovedByID] = useState("");
  const [approvedDate, setApprovedDate] = useState("");

  const [defaultValueForm, setDefaultValueForm] = useState(null);

  const currentValue = {
    allocatedBranchID,
    allocatedWarehouseID,
    fromWarehouseID,
    date,
    description,
    transferKuotaDetailSourceRep,
    transferKuotaSourceDetailTransferRep,
  };

  const isFormUpdated = useFormIsUpdated(defaultValueForm, currentValue);

  const value = {
    status,
    setStatus,
    date,
    setDate,
    sourceBranchID,
    setSourceBranchID,
    allocatedBranchID,
    setAllocatedBranchID,
    fromWarehouseID,
    setFromWarehouseID,
    allocatedWarehouseID,
    setAllocatedWarehouseID,
    description,
    setDescription,
    createdByID,
    setCreatedByID,
    rejectReason,
    setRejectReason,
    approveReason,
    setApproveReason,
    reject,
    setreject,
    approve,
    setApprove,
    openSourceWarehouse,
    setOpenSourceWarehouse,
    openAllocatedWarehouse,
    setOpenAllocatedWarehouse,
    openRefNbr,
    setOpenRefNbr,
    openMutasiKuota,
    setOpenMutasiKuota,
    transferKuotaDetailSourceRep,
    setTransferKuotaDetailSourceRep,
    transferKuotaSourceDetailTransferRep,
    setTransferKuotaSourceDetailTransferRep,
    approvedByID,
    setApprovedByID,
    approvedDate,
    setApprovedDate,
    defaultValueForm,
    setDefaultValueForm,
    isFormUpdated,
  };

  return (
    <TransferKuotaContext.Provider value={value}>
      {children}
    </TransferKuotaContext.Provider>
  );
};

export default TransferKuotaContextProvider;
