import { useEffect, useState } from "react";
import { getAkses } from "../utils/jwt";
import {
  Timer,
  LocalOffer,
  PriceCheck,
  RequestQuote,
  Outbound,
  CompareArrows,
  MultipleStop,
  PendingActions,
  GroupWork,
  ArchiveRounded,
  ApprovalTwoTone,
  AddLocation,
  AccountTree,
  BorderColorRounded,
  Person,
  AutoGraph,
  Receipt,
  AccountBalance,
  Email,
  ManageAccounts,
  Alarm,
  Construction,
} from "@material-ui/icons";
import {
  CreditCard,
  Hash,
  Layout,
  PhoneCall,
  Sliders,
  Users,
} from "react-feather";

const generateMenuErp = () => {
  let menu = [];
  if (getAkses().split(",")?.includes("SAC300007")) {
    menu.push({
      href: "/expiry-date",
      icon: Timer,
      title: "Expiry Date",
    });
  }
  if (getAkses().split(",")?.includes("SAC300002")) {
    menu.push({
      href: "/promo-activity",
      icon: LocalOffer,
      title: "Promotion Activity",
    });
  }
  if (getAkses().split(",")?.includes("SAC300004")) {
    menu.push({
      href: "/competitor-price-info",
      icon: PriceCheck,
      title: "Competitor Price Information",
    });
  }
  if (getAkses().split(",")?.includes("SAC300005")) {
    menu.push({
      href: "/customer-price-info",
      icon: RequestQuote,
      title: "Customer Price Information",
    });
  }
  if (getAkses().split(",")?.includes("SAW300011")) {
    menu.push({
      href: "/list-so-otorisasi",
      icon: CreditCard,
      title: "List SO Otorisasi",
    });
  }
  if (getAkses().split(",")?.includes("SAW200002")) {
    menu.push({
      href: "/allocated-kuota",
      icon: Outbound,
      title: "Allocated Kuota",
    });
  }
  if (getAkses().split(",")?.includes("SAW200003")) {
    menu.push({
      href: "/adjustment-kuota",
      icon: Outbound,
      title: "Adjustment Kuota",
    });
  }
  if (getAkses().split(",")?.includes("SAW200003")) {
    menu.push({
      href: "/transfer-cabang",
      icon: CompareArrows,
      title: "Transfer Cabang",
    });
  }
  if (getAkses().split(",")?.includes("SAW200004")) {
    menu.push({
      href: "/transfer-kuota",
      icon: CompareArrows,
      title: "Transfer Kuota",
    });
  }
  if (getAkses().split(",")?.includes("SAW600002")) {
    menu.push({
      href: "/mutation-allocated-kuota",
      icon: MultipleStop,
      title: "Mutation Allocated Kuota",
    });
  }
  if (getAkses().split(",")?.includes("SAF300003")) {
    menu.push({
      href: "/desk-call",
      icon: PhoneCall,
      title: "Desk Call",
    });
  }
  if (getAkses().split(",")?.includes("SAF300002")) {
    menu.push({
      icon: PendingActions,
      href: "/laporan-harian-inkaso/mobile",
      title: "Laporan Harian Inkaso (Kolektor)",
    });
  }
  if (getAkses().split(",")?.includes("SAF300001")) {
    menu.push({
      href: "/laporan-harian-inkaso",
      icon: PendingActions,
      title: "Laporan Harian Inkaso",
    });
  }
  return menu;
};

const generateMenuApproval = () => {
  let menu = [];
  if (getAkses().split(",")?.includes("SAW300012")) {
    menu.push({
      href: "/dashboard-approval",
      icon: Sliders,
      title: "Dashboard Approval",
    });
  }
  return menu;
};

const generateMenuMasterData = () => {
  let menu = [];
  if (getAkses().split(",")?.includes("SAW300003")) {
    menu.push({
      href: "/master-data/vendor",
      icon: GroupWork,
      title: "Vendor",
    });
  }
  if (getAkses().split(",")?.includes("SAW300009")) {
    menu.push({
      href: "/master-data/stock-item",
      icon: ArchiveRounded,
      title: "Stock Item",
    });
  }
  if (getAkses().split(",")?.includes("SAG300005")) {
    menu.push({
      href: "/master-data/approval",
      icon: ApprovalTwoTone,
      title: "Approval",
    });
  }
  if (getAkses().split(",")?.includes("SAG300003")) {
    menu.push({
      href: "/master-data/position",
      icon: AddLocation,
      title: "Position",
    });
  }
  if (getAkses().split(",")?.includes("SAG300001")) {
    menu.push({
      href: "/master-data/branch",
      icon: AccountTree,
      title: "Branch",
    });
  }
  if (getAkses().split(",")?.includes("SAW300006")) {
    menu.push({
      href: "/master-data/sales-order",
      icon: BorderColorRounded,
      title: "Sales Order",
    });
  }
  if (getAkses().split(",")?.includes("SAW300002")) {
    menu.push({
      href: "/master-data/customer",
      icon: Users,
      title: "Customer",
    });
  }
  if (getAkses().split(",")?.includes("SAG300004")) {
    menu.push({
      href: "/master-data/employee",
      icon: Person,
      title: "Employee",
    });
  }
  if (getAkses().split(",")?.includes("SAC300001")) {
    menu.push({
      href: "/master-data/master-promo",
      icon: LocalOffer,
      title: "Promotion",
    });
  }
  if (getAkses().split(",")?.includes("SAC300003")) {
    menu.push({
      href: "/master-data/master-competitor",
      icon: AutoGraph,
      title: "Competitor",
    });
  }
  if (getAkses().split(",")?.includes("SAW300005")) {
    menu.push({
      href: "/master-data/invoice",
      icon: Receipt,
      title: "Invoice",
    });
  }
  if (getAkses().split(",")?.includes("SAW300001")) {
    menu.push({
      href: "/master-data/warehouse",
      icon: AccountBalance,
      title: "Warehouse",
    });
  }
  return menu;
};

const generateMenuKonfigurasi = () => {
  const isSuperAdmin =
    window.localStorage.getItem("roleName") === "Super Admin";

  let menu = [
    ...(isSuperAdmin
      ? [
          {
            href: "/konfigurasi/set-maintenance",
            icon: Construction,
            title: "Set Maintenance",
          },
        ]
      : []),
    {
      href: "/konfigurasi/numbering-sequences",
      icon: Hash,
      title: "Numbering Sequences",
    },
    {
      href: "/konfigurasi/scheduller",
      icon: Alarm,
      title: "Scheduler",
    },
  ];
  if (getAkses().split(",")?.includes("SAG100002")) {
    menu.push({
      href: "/konfigurasi/set-server-email",
      icon: Email,
      title: "Setup Server Email",
    });
  }
  if (getAkses().split(",")?.includes("SAG100003")) {
    menu.push({
      href: "/konfigurasi/notifikasi-template",
      icon: Layout,
      title: "Notifikasi Template",
    });
  }
  if (getAkses().split(",")?.includes("SAG100005")) {
    menu.push({
      href: "/konfigurasi/user-registration",
      icon: ManageAccounts,
      title: "Setup User Registration",
    });
  }
  if (getAkses().split(",")?.includes("SAG100004")) {
    menu.push({
      href: "/master-data/master-role",
      icon: Users,
      title: "Master Role",
    });
  }
  if (getAkses().split(",")?.includes("SAG100001")) {
    menu.push({
      href: "/master-data/user-role",
      icon: Users,
      title: "User Roles",
    });
  }
  return menu;
};

export const useMenuSidebar = () => {
  const [navItems, setNavItems] = useState([
    {
      title: "ERP",
      pages: [],
    },
    {
      title: "Approval",
      pages: [],
    },
    {
      title: "Master Data",
      pages: [],
    },
    {
      title: "Konfigurasi",
      pages: [],
    },
  ]);

  useEffect(() => {
    const menuErp = generateMenuErp();
    const menuApproval = generateMenuApproval();
    const menuMasterData = generateMenuMasterData();
    const menuKonfigurasi = generateMenuKonfigurasi();
    setNavItems(
      navItems.map((nav) => {
        if (nav.title === "ERP") {
          return { ...nav, pages: menuErp };
        }
        if (nav.title === "Approval") {
          return { ...nav, pages: menuApproval };
        }
        if (nav.title === "Master Data") {
          return { ...nav, pages: menuMasterData };
        }
        if (nav.title === "Konfigurasi") {
          return { ...nav, pages: menuKonfigurasi };
        }
        return nav;
      })
    );
  }, []);

  console.log({ navItems });

  return { navItems };
};
