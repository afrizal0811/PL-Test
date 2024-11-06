import {
  BookOpen,
  Briefcase,
  Calendar,
  CheckSquare,
  CreditCard,
  Grid,
  Heart,
  Layout,
  List,
  Map,
  ShoppingCart,
  PieChart,
  Sliders,
  Users,
  Settings,
  Printer,
  Navigation,
  Layers,
  Clipboard,
  PhoneCall,
  Hash,
  AlertCircle,
} from "react-feather";

import {
  GroupWork,
  AccountBalance,
  BorderColorRounded,
  ArchiveRounded,
  AccountTree,
  LocationCity,
  Person,
  LocalOffer,
  Approval,
  Receipt,
  ApprovalTwoTone,
  Apps,
  AddLocation,
  Map as Maps,
  LocalShipping as Vehicles,
  BatchPrediction,
  ConfirmationNumber as LotTicket,
  AutoGraph,
  PriceCheck,
  RequestQuote,
  Email,
  PendingActions,
  Apartment,
  Timer,
  Article,
  ManageAccounts,
  PhoneIphone,
  Alarm,
  Outbound,
  CompareArrows,
  MultipleStop,
} from "@material-ui/icons";

const pagesSection = [
  // {

  //   href: "/dashboard",
  //   icon: Sliders,
  //   title: "Dashboard",
  //   children: [
  //     {
  //       href: "/dashboard/default",
  //       title: "Default",
  //     },
  //     {
  //       href: "/dashboard/analytics",
  //       title: "Analytics",
  //     },
  //     {
  //       href: "/dashboard/saas",
  //       title: "SaaS",
  //     },
  //   ],
  // },
  {
    href: "/list-so-otorisasi",
    icon: CreditCard,
    title: "List SO Otorisasi",
  },
  {
    href: "/promo-activity",
    icon: LocalOffer,
    title: "Promotion Activity",
  },
  // {
  //   href: "/process-order",
  //   icon: Clipboard,
  //   title: "Process Order",
  // },
  // {
  //   href: "/serah-terima-history",
  //   icon: Printer,
  //   title: "Serah Terima History",
  // },
  // {
  //   href: "/routing",
  //   icon: Navigation,
  //   title: "Routing",
  // },
  // {
  //   href: "/batching",
  //   icon: Layers,
  //   title: "Batching",
  // },
  // {
  //   href: "/batching-history",
  //   icon: BatchPrediction,
  //   title: "Batching History",
  // },
  {
    href: "/laporan-harian-inkaso",
    icon: PendingActions,
    title: "Laporan Harian Inkaso",
  },
  {
    // href: "/change-lot-nbr-exp-date",
    icon: PendingActions,
    href: "/laporan-harian-inkaso/mobile",
    title: "Laporan Harian Inkaso (Kolektor)",
  },
  {
    href: "/change-lot-nbr-exp-date",
    icon: LotTicket,
    title: "Change Lot Nbr & Exp Date",
  },
  {
    href: "/competitor-price-info",
    icon: PriceCheck,
    title: "Competitor Price Information",
  },
  {
    href: "/customer-price-info",
    icon: RequestQuote,
    title: "Customer Price Information",
  },
  {
    href: "/desk-call",
    icon: PhoneCall,
    title: "Desk Call",
  },
  {
    href: "/expiry-date",
    icon: Timer,
    title: "Expiry Date",
  },
  {
    href: "/allocated-kuota",
    icon: Outbound,
    title: "Allocated Kuota",
  },
  {
    href: "/transfer-cabang",
    icon: CompareArrows,
    title: "Transfer Cabang",
  },
  {
    href: "/mutation-allocated-kuota",
    icon: MultipleStop,
    title: "Mutation Allocated Kuota",
  },
  {
    href: "/transfer-kuota",
    icon: CompareArrows,
    title: "Transfer Kuota",
  },
  // {
  //   href: "/pages",
  //   icon: Layout,
  //   title: "Pages",
  //   children: [
  //     {
  //       href: "/pages/profile",
  //       title: "Profile",
  //     },
  //     {
  //       href: "/pages/settings",
  //       title: "Settings",
  //     },
  //     {
  //       href: "/pages/pricing",
  //       title: "Pricing",
  //     },
  //     {
  //       href: "/pages/chat",
  //       title: "Chat",
  //     },
  //     {
  //       href: "/pages/blank",
  //       title: "Blank Page",
  //     },
  //   ],
  // },
  // {
  //   href: "/projects",
  //   icon: Briefcase,
  //   title: "Projects",
  //   badge: "8",
  // },
  // {
  //   href: "/orders",
  //   icon: ShoppingCart,
  //   title: "Orders",
  // },
  // {
  //   href: "/invoices",
  //   icon: CreditCard,
  //   title: "Invoices",
  //   children: [
  //     {
  //       href: "/invoices",
  //       title: "List",
  //     },
  //     {
  //       href: "/invoices/detail",
  //       title: "Detail",
  //     },
  //   ],
  // },
  // {
  //   href: "/tasks",
  //   icon: CheckSquare,
  //   title: "Tasks",
  //   badge: "17",
  // },
  // {
  //   href: "/calendar",
  //   icon: Calendar,
  //   title: "Calendar",
  // },
  // {
  //   href: "/auth",
  //   icon: Users,
  //   title: "Auth",
  //   children: [
  //     {
  //       href: "/auth/sign-in",
  //       title: "Sign In",
  //     },
  //     {
  //       href: "/auth/sign-up",
  //       title: "Sign Up",
  //     },
  //     {
  //       href: "/auth/reset-password",
  //       title: "Reset Password",
  //     },
  //     {
  //       href: "/auth/404",
  //       title: "404 Page",
  //     },
  //     {
  //       href: "/auth/500",
  //       title: "500 Page",
  //     },
  //   ],
  // },
];

const elementsSection = [
  {
    href: "/components",
    icon: Grid,
    title: "Components",
    children: [
      {
        href: "/components/alerts",
        title: "Alerts",
      },
      {
        href: "/components/accordion",
        title: "Accordion",
      },
      {
        href: "/components/avatars",
        title: "Avatars",
      },
      {
        href: "/components/badges",
        title: "Badges",
      },
      {
        href: "/components/buttons",
        title: "Buttons",
      },
      {
        href: "/components/cards",
        title: "Cards",
      },
      {
        href: "/components/chips",
        title: "Chips",
      },
      {
        href: "/components/dialogs",
        title: "Dialogs",
      },
      {
        href: "/components/lists",
        title: "Lists",
      },
      {
        href: "/components/menus",
        title: "Menus",
      },
      {
        href: "/components/pagination",
        title: "Pagination",
      },
      {
        href: "/components/progress",
        title: "Progress",
      },
      {
        href: "/components/snackbars",
        title: "Snackbars",
      },
      {
        href: "/components/tooltips",
        title: "Tooltips",
      },
    ],
  },
  // {
  //   href: "/charts",
  //   icon: PieChart,
  //   title: "Charts",
  // },
  // {
  //   href: "/forms",
  //   icon: CheckSquare,
  //   title: "Forms",
  //   children: [
  //     {
  //       href: "/forms/pickers",
  //       title: "Pickers",
  //     },
  //     {
  //       href: "/forms/selection-controls",
  //       title: "Selection Controls",
  //     },
  //     {
  //       href: "/forms/selects",
  //       title: "Selects",
  //     },
  //     {
  //       href: "/forms/text-fields",
  //       title: "Text Fields",
  //     },
  //     {
  //       href: "/forms/editors",
  //       title: "Editors",
  //     },
  //     {
  //       href: "/forms/formik",
  //       title: "Formik",
  //     },
  //   ],
  // },
  // {
  //   href: "/tables",
  //   icon: List,
  //   title: "Tables",
  //   children: [
  //     {
  //       href: "/tables/simple-table",
  //       title: "Simple Table",
  //     },
  //     {
  //       href: "/tables/advanced-table",
  //       title: "Advanced Table",
  //     },
  //     {
  //       href: "/tables/data-grid",
  //       title: "Data Grid",
  //     },
  //   ],
  // },
  // {
  //   href: "/icons",
  //   icon: Heart,
  //   title: "Icons",
  //   children: [
  //     {
  //       href: "/icons/material-icons",
  //       title: "Material Icons",
  //     },
  //     {
  //       href: "/icons/feather-icons",
  //       title: "Feather Icons",
  //     },
  //   ],
  // },
  // {
  //   href: "/maps",
  //   icon: Map,
  //   title: "Maps",
  //   children: [
  //     {
  //       href: "/maps/google-maps",
  //       title: "Google Maps",
  //     },
  //     {
  //       href: "/maps/vector-maps",
  //       title: "Vector Maps",
  //     },
  //   ],
  // },
];

const masterDataSection = [
  {
    href: "/master-data/vendor",
    icon: GroupWork,
    title: "Vendor",
  },
  {
    href: "/master-data/customer",
    icon: Users,
    title: "Customer",
  },
  {
    href: "/master-data/warehouse",
    icon: AccountBalance,
    title: "Warehouse",
  },
  {
    href: "/master-data/sales-order",
    icon: BorderColorRounded,
    title: "Sales Order",
  },
  {
    href: "/master-data/stock-item",
    icon: ArchiveRounded,
    title: "Stock Item",
  },
  {
    href: "/master-data/branch",
    icon: AccountTree,
    title: "Branch",
  },
  {
    href: "/master-data/employee",
    icon: Person,
    title: "Employee",
  },
  {
    href: "/master-data/approval",
    icon: ApprovalTwoTone,
    title: "Approval",
  },
  {
    href: "/master-data/department",
    icon: Apps,
    title: "Department",
  },
  {
    href: "/master-data/position",
    icon: AddLocation,
    title: "Position",
  },
  {
    href: "/master-data/master-zona",
    icon: Maps,
    title: "Shipping Zone",
  },
  // {
  //   href: "/master-data/master-kendaraan",
  //   icon: Vehicles,
  //   title: "Kendaraan",
  // },
  {
    href: "/master-data/set-transaksiid",
    icon: Receipt,
    title: "Transaksi ID",
  },
  {
    href: "/master-data/master-promo",
    icon: LocalOffer,
    title: "Master Promotion",
  },
  {
    href: "/master-data/master-competitor",
    icon: AutoGraph,
    title: "Master Competitor",
  },
  // {
  //   href: "/master-data/fixed-asset",
  //   icon: Apartment,
  //   title: "Fixed Asset",
  // },
  {
    href: "/master-data/kategori",
    icon: Grid,
    title: "Kategori",
  },
  {
    href: "/master-data/issue",
    icon: AlertCircle,
    title: "Issue",
  },
  // {
  //   href: "/master-data/receipt",
  //   icon: Receipt,
  //   title: "Master Receipt",
  // },
  {
    href: "/master-data/invoice",
    icon: Receipt,
    title: "Master Invoice",
  },
  // {
  //   href: "/changelog",
  //   icon: List,
  //   title: "Changelog",
  //   badge: "v3.0.0",
  // },
];

const konfigurasiSection = [
  {
    href: "/konfigurasi",
    icon: Settings,
    title: "Set UP Backend",
    children: [
      {
        href: "/konfigurasi/set-key",
        title: "Setup Key",
      },
    ],
  },
  {
    href: "/konfigurasi/set-server-email",
    icon: Email,
    title: "Setup Server Email",
    // badge: "v3.0.0",
  },
  {
    href: "/konfigurasi/numbering-sequences",
    icon: Hash,
    title: "Numbering Sequences",
  },
  // {
  //   href: "/konfigurasi/screen-number",
  //   icon: Article,
  //   title: "Setup Screen Number",
  //   // badge: "v3.0.0",
  // },
  {
    href: "/konfigurasi/user-role",
    icon: Users,
    title: "Setup User Role",
    // badge: "v3.0.0",
  },
  {
    href: "/konfigurasi/notifikasi-template",
    icon: Layout,
    title: "Notifikasi Template",
  },
  {
    href: "/konfigurasi/user-registration",
    icon: ManageAccounts,
    title: "Setup User Registration",
    // badge: "v3.0.0",
  },
  {
    href: "/konfigurasi/user-setting",
    icon: ManageAccounts,
    title: "Setup User Setting",
    // badge: "v3.0.0",
  },
  {
    href: "/konfigurasi/scheduller",
    icon: Alarm,
    title: "Scheduler",
  },
  {
    href: "/master-data/master-role",
    icon: Users,
    title: "Master Role",
  },
  {
    href: "/master-data/user-role",
    icon: Users,
    title: "User Roles",
  },
];

const mobileSection = [
  {
    href: "/mobile",
    icon: PhoneIphone,
    title: "Template Mobile UI",
    // children: [
    //   {
    //     href: "/mobile/inquiry",
    //     title: "Inquiry",
    //   },
    //   {
    //     href: "/mobile/listing",
    //     title: "Listing",
    //   },
    //   {
    //     href: "/mobile/entry",
    //     title: "Entry",
    //   },
    // ],
  },
  // {
  //   href: "/mobile/expiry-date",
  //   icon: Outbound,
  //   title: "Expiry Date",
  // },
];

const docsSection = [
  {
    href: "/dashboard-approval",
    icon: Sliders,
    title: "Dashboard Approval",
  },
  // {
  //   href: "/changelog",
  //   icon: List,
  //   title: "Changelog",
  //   badge: "v3.0.0",
  // },
];

const navItems = [
  {
    title: "ERP",
    pages: pagesSection,
  },
  {
    title: "Approval",
    pages: docsSection,
  },
  {
    title: "Master Data",
    pages: masterDataSection,
  },
  // {
  //   title: "Mobile",
  //   pages: mobileSection,
  // },
  {
    title: "Konfigurasi",
    pages: konfigurasiSection,
  },
  // {
  //   title: "Material App",
  //   pages: docsSection,
  // },
];

export default navItems;
