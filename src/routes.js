import React from "react";

// import async from "./components/Async";

// All pages that rely on 3rd party components (other than Material-UI) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "./layouts/Auth";
import DashboardLayout from "./layouts/Dashboard";
// import DocLayout from "./layouts/Doc";
// import PresentationLayout from "./layouts/Presentation";

// Guards
import AuthGuard from "./components/guards/AuthGuard";

// Auth components
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Page404 from "./pages/auth/Page404";
import Page500 from "./pages/auth/Page500";

// Components
// import Accordion from "./pages/components/Accordion";
// import Alerts from "./pages/components/Alerts";
// import Avatars from "./pages/components/Avatars";
// import Badges from "./pages/components/Badges";
// import Buttons from "./pages/components/Buttons";
// import Cards from "./pages/components/Cards";
// import Chips from "./pages/components/Chips";
// import Dialogs from "./pages/components/Dialogs";
// import Lists from "./pages/components/Lists";
// import Menus from "./pages/components/Menus";
// import Pagination from "./pages/components/Pagination";
// import Progress from "./pages/components/Progress";
// import Snackbars from "./pages/components/Snackbars";
// import Tooltips from "./pages/components/Tooltips";

// Form components
// import SelectionCtrls from "./pages/forms/SelectionControls";
// import Selects from "./pages/forms/Selects";
// import TextFields from "./pages/forms/TextFields";

// Icon components
// import MaterialIcons from "./pages/icons/MaterialIcons";

// Page components
// import Blank from "./pages/pages/Blank";
// import InvoiceDetails from "./pages/pages/InvoiceDetails";
// import InvoiceList from "./pages/pages/InvoiceList";
// import Orders from "./pages/pages/Orders";
// import Pricing from "./pages/pages/Pricing";
// import Settings from "./pages/pages/Settings";
// import Projects from "./pages/pages/Projects";
// import Chat from "./pages/pages/Chat";

// Table components
// import SimpleTable from "./pages/tables/SimpleTable";
// import AdvancedTable from "./pages/tables/AdvancedTable";

// Documentation
// import Welcome from "./pages/docs/Welcome";
// import GettingStarted from "./pages/docs/GettingStarted";
// import Routing from "./pages/docs/Routing";
// import Auth0 from "./pages/docs/auth/Auth0";
// import Firebase from "./pages/docs/auth/Firebase";
// import JWT from "./pages/docs/auth/JWT";
// import Guards from "./pages/docs/Guards";
// import EnvironmentVariables from "./pages/docs/EnvironmentVariables";
// import Deployment from "./pages/docs/Deployment";
// import Theming from "./pages/docs/Theming";
// import APICalls from "./pages/docs/APICalls";
// import Redux from "./pages/docs/Redux";
// import Internationalization from "./pages/docs/Internationalization";
// import ESLintAndPrettier from "./pages/docs/ESLintAndPrettier";
// import MigratingToNextJS from "./pages/docs/MigratingToNextJS";
// import Support from "./pages/docs/Support";
// import Changelog from "./pages/docs/Changelog";

// Landing
// import Landing from "./pages/presentation/Landing";

// Protected routes
import ProtectedPage from "./pages/protected/ProtectedPage";
import ListSOOtorisasi from "./pages/ERP/ListSoOtorisasi/index";
import DashboardApproval from "./pages/dashboardApproval";
import DashboardApprovalDetail from "./pages/dashboardApproval/detail";
import SerahTerimaHistory from "./pages/serahTerimaHistory";
import ProcessOrder from "./pages/ERP/ProcessOrder";
import Routing from "./pages/ERP/Routing";
import Batching from "./pages/ERP/Batching";
import BatchingHistory from "./pages/ERP/BatchingHistory";
import ChangeLotNbrExpDate from "./pages/ERP/ChangeLotNbrExpDate";
import AddChangeLotNbrExpDate from "./pages/ERP/ChangeLotNbrExpDate/Add";
// import UpdateChangeLotNbrExpDate from "./pages/ERP/ChangeLotNbrExpDate/Update";
import LaporanHarianInkaso from "./pages/ERP/LaporanHarianInkaso";
import DeskCall from "./pages/ERP/DeskCall";
import CompetitorPriceInfo from "./pages/ERP/CompetitorPriceInfo";
import AddCompetitorPriceInfo from "./pages/ERP/CompetitorPriceInfo/Add";
import UpdateCompetitorPriceInfo from "./pages/ERP/CompetitorPriceInfo/Update";
import CustomerPriceInfo from "./pages/ERP/CustomerPriceInfo";
import DetailCustomerPriceInfo from "./pages/ERP/CustomerPriceInfo/detail/index";
import TransferCabang from "./pages/ERP/TransferCabang";
import AddTransferCabang from "./pages/ERP/TransferCabang/Add";
import MyProfile from "./pages/MyProfile";
import MutationAllocatedKuota from "./pages/ERP/MutationAllocatedKuota";

// Master Data
import Vendor from "./pages/masterData/vendor/Vendor";
import Customer from "./pages/masterData/customer/Customer";
import DetailCustomer from "./pages/masterData/customer/Detail/Detail";
import Warehouse from "./pages/masterData/warehouse/Warehouse";
import SalesOrder from "./pages/masterData/salesorder/SalesOrder";
import DetailSalesOrder from "./pages/masterData/salesorder/Detail/Detail";
import StockItems from "./pages/masterData/stockitems/StockItems";
import SetKey from "./pages/konfigurasi/setkey/SetKey";
import Branch from "./pages/masterData/branch/Branch";
import Location from "./pages/masterData/location/Location";
import DetailSetKey from "./pages/konfigurasi/setkey/Detail";
import DetailWarehouse from "./pages/masterData/warehouse/Detail/Detail";
import DetailBranch from "./pages/masterData/branch/detail/index";
import DetailVendor from "./pages/masterData/vendor/detail/index";
import Employee from "./pages/masterData/employee/Employee";
import DetailEmployee from "./pages/masterData/employee/Detail/Detail";
import DetailStockItem from "./pages/masterData/stockitems/detail/index";
import SetScreen from "./pages/konfigurasi/setscreenid/SetScreen";
import Approval from "./pages/masterData/approval/Approval";
// import DetailApproval from "./pages/masterData/approval/Detail";
import Table from "./pages/testing/Table";
// import AddApproval from "./pages/masterData/approval/Add";
import Departement from "./pages/masterData/departement/Departement";
import DetailTransaksiID from "./pages/konfigurasi/setscreenid/Detail";
import MultipleDropdown from "./pages/testing/MultipleDropdown";
import ErrorInput from "./pages/testing/ErrorInput";
import Position from "./pages/masterData/position/Position";
import MasterZona from "./pages/masterData/masterZona/MasterZona";
// import AddMasterZona from "./pages/masterData/masterZona/Add";
// import UpdateMasterZona from "./pages/masterData/masterZona/Update";
import MasterKendaraan from "./pages/masterData/masterKendaraan/MasterKendaraan";
import AddMasterKendaraan from "./pages/masterData/masterKendaraan/Add/index";
import UpdateMasterKendaraan from "./pages/masterData/masterKendaraan/Update/index";
import Promo from "./pages/masterData/masterPromosi/Promosi";
// import AddPromo from "./pages/masterData/masterPromosi/Add";
import DetailPromoAct from "./pages/ERP/promoActivity/detail/index";
import PromoAct from "./pages/ERP/promoActivity/PromoActivity";
import AddMasterApproval from "./pages/masterData/approval/add/index";
import UpdateMasterApproval from "./pages/masterData/approval/update/index";
import DetailZona from "./pages/masterData/masterZona/Detail";
import MasterCompetitor from "./pages/masterData/masterCompetitor/Competitor";
// import AddMasterCompetitor from "./pages/masterData/masterCompetitor/Add";
import UpdateMasterCompetitor from "./pages/masterData/masterCompetitor/Update";
import Kategori from "./pages/masterData/Kategori";
import DetailKategori from "./pages/masterData/Kategori/Detail";
import Issue from "./pages/masterData/Issue";
import DetailIssue from "./pages/masterData/Issue/Detail";
import MasterRole from "./pages/masterData/masterRole/index";
import MasterRoleDetail from "./pages/masterData/masterRole/Detail";
import MasterUserRole from "./pages/masterData/userRole/UserRole";
import MasterUserRoleDetail from "./pages/masterData/userRole/Detail";

//konfigurasi
import SetServerEmail from "./pages/konfigurasi/serverEmail/index";
import NumberingSequences from "./pages/konfigurasi/NumberingSequences";
import DetailMasterPromosi from "./pages/masterData/masterPromosi/Detail";
import MasterFixedAsset from "./pages/masterData/fixedAsset/MasterFixedAsset";
import DetailFixedAsset from "./pages/masterData/fixedAsset/Detail";
import ExpiryDate from "./pages/ERP/ExpiryDate";
import AddExpiryDate from "./pages/ERP/ExpiryDate/Add";
import AllocatedKuota from "./pages/ERP/AllocatedKuota";
import AddAllocatedKuota from "./pages/ERP/AllocatedKuota/Add";
import ScreenNumber from "./pages/konfigurasi/screenNumber/ScreenNumber";
import DetailScreenNumber from "./pages/konfigurasi/screenNumber/Detail";
import UserRole from "./pages/konfigurasi/userRole/UserRole";
import DetailUserRole from "./pages/konfigurasi/userRole/Detail";
import Receipt from "./pages/masterData/masterReceipt/Receipt";
import DetailReceipt from "./pages/masterData/masterReceipt/Detail";
import NotifikasiTemplate from "./pages/konfigurasi/NotifikasiTemplate";
import AddNotifikasiTemplate from "./pages/konfigurasi/NotifikasiTemplate/Add";
import UpdateNotifikasiTemplate from "./pages/konfigurasi/NotifikasiTemplate/Update";
import UserSetting from "./pages/konfigurasi/userSetting";

// import UpdateExpiryDate from "./pages/ERP/ExpiryDate/Update";
import NumberingSequenceDetail from "./pages/konfigurasi/NumberingSequences/detail";
import MasterInvoice from "./pages/masterData/masterInvoince/MasterInvoice";
import DetailInvoice from "./pages/masterData/masterInvoince/Detail";
import Scheduller from "./pages/konfigurasi/scheduller/SchedullerTable";
import DetailMutationAllocatedKuota from "./pages/ERP/MutationAllocatedKuota/Detail";
import TransferKuota from "./pages/ERP/TransferKuota";
import AddTransferKuota from "./pages/ERP/TransferKuota/Add";

//mobile
import MobileInquiry from "./pages/mobile/template/Inquiry";
import MobileMenu from "./pages/mobile/template/Menu";
import MobileListing from "./pages/mobile/template/Listing";
import MobileInquiry2 from "./pages/mobile/template/Inquiry2";
import MobileEntry from "./pages/mobile/template/Entry";
import MobileListingExpiryDate from "./pages/mobile/expiryDate/Listing";
import LaporanHarianInkasoDetail from "./pages/ERP/LaporanHarianInkaso/Detail";
import LaporanHarianInkasoKolektor from "./pages/ERP/LaporanHarianInkaso/LHIKolektor";
import UserReg from "./pages/konfigurasi/userRegister/Listing";
import DetailUserReg from "./pages/konfigurasi/userRegister/Detail";
import KolektorDetail from "./pages/ERP/LaporanHarianInkaso/Kolektor/Detail/KolektorDetail";
import AdjustmentKuota from "./pages/ERP/AdjustKuota";
import DetailAdjustmentKuota from "./pages/ERP/AdjustKuota/detail";
import SetMaintenance from "./pages/konfigurasi/SetMaintenance";

// Dashboard components
// const Default = async(() => import("./pages/dashboards/Default"));
// const Analytics = async(() => import("./pages/dashboards/Analytics"));
// const SaaS = async(() => import("./pages/dashboards/SaaS"));

// Form components
// const Pickers = async(() => import("./pages/forms/Pickers"));
// const Editors = async(() => import("./pages/forms/Editors"));
// const Formik = async(() => import("./pages/forms/Formik"));

// Icon components
// const FeatherIcons = async(() => import("./pages/icons/FeatherIcons"));
// const Profile = async(() => import("./pages/pages/Profile"));
// const Tasks = async(() => import("./pages/pages/Tasks"));
// const Calendar = async(() => import("./pages/pages/Calendar"));

// Table components
// const DataGrid = async(() => import("./pages/tables/DataGrid"));

// Chart components
// const Chartjs = async(() => import("./pages/charts/Chartjs"));

// Maps components
// const GoogleMaps = async(() => import("./pages/maps/GoogleMaps"));
// const VectorMaps = async(() => import("./pages/maps/VectorMaps"));

const routes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProtectedPage />,
      },
    ],
  },
  {
    path: "/my-profile/:id",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
  {
    path: "private",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProtectedPage />,
      },
    ],
  },
  {
    path: "/list-so-otorisasi",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        // element: <ListSOOtorisasi />,
        element: <ListSOOtorisasi />,
      },
    ],
  },
  {
    path: "/dashboard-approval",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardApproval />,
      },
      {
        path: "/detail/:id",
        element: <DashboardApproval />,
        // element: <DashboardApprovalDetail />,
      },
    ],
  },
  {
    path: "/process-order",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ProcessOrder />,
      },
    ],
  },
  {
    path: "/serah-terima-history",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <SerahTerimaHistory />,
      },
    ],
  },
  {
    path: "/routing",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Routing />,
      },
    ],
  },
  {
    path: "/batching",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <Batching />,
      },
    ],
  },
  {
    path: "/batching-history",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <BatchingHistory />,
      },
    ],
  },
  {
    path: "/change-lot-nbr-exp-date",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ChangeLotNbrExpDate />,
      },
      {
        path: "/add",
        element: <AddChangeLotNbrExpDate />,
      },
      {
        path: "/detail/:id",
        element: <AddChangeLotNbrExpDate />,
      },
    ],
  },
  {
    path: "/laporan-harian-inkaso",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <LaporanHarianInkaso />,
      },
      {
        path: "/detail/:id",
        element: <LaporanHarianInkasoDetail />,
      },
      {
        path: "/add",
        element: <LaporanHarianInkasoDetail />,
      },
      {
        path: "/mobile",
        element: <LaporanHarianInkasoKolektor />,
      },
      {
        path: "/mobile/:id",
        element: <KolektorDetail />,
      },
    ],
  },
  {
    path: "/competitor-price-info",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <CompetitorPriceInfo />,
      },
      {
        path: "/add",
        element: <AddCompetitorPriceInfo />,
      },
      {
        path: "/detail/:id",
        element: <AddCompetitorPriceInfo />,
      },
    ],
  },
  {
    path: "/customer-price-info",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <CustomerPriceInfo />,
      },
      {
        path: "/add",
        element: <DetailCustomerPriceInfo />,
      },
      {
        path: "/detail/:id",
        element: <DetailCustomerPriceInfo />,
      },
    ],
  },
  {
    path: "/promo-activity",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <PromoAct />,
      },
      {
        path: "/add",
        element: <DetailPromoAct />,
      },
      {
        path: "/detail/:id",
        element: <DetailPromoAct />,
      },
    ],
  },
  {
    path: "/desk-call",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <DeskCall />,
      },
    ],
  },
  {
    path: "/expiry-date",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <ExpiryDate />,
      },
      {
        path: "/add",
        element: <AddExpiryDate />,
      },
      {
        path: "/detail/:id",
        element: <AddExpiryDate />,
      },
    ],
  },
  {
    path: "/transfer-cabang",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <TransferCabang />,
      },
      {
        path: "/add",
        element: <AddTransferCabang />,
      },
      {
        path: "/detail/:id",
        element: <AddTransferCabang />,
      },
    ],
  },
  {
    path: "/transfer-kuota",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <TransferKuota />,
      },
      {
        path: "/add",
        element: <AddTransferKuota />,
      },
      {
        path: "/detail/:id",
        element: <AddTransferKuota />,
      },
    ],
  },
  {
    path: "/adjustment-kuota",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <AdjustmentKuota />,
      },
      {
        path: "/add",
        element: <DetailAdjustmentKuota />,
      },
      {
        path: "/detail/:id",
        element: <DetailAdjustmentKuota />,
      },
    ],
  },
  {
    path: "/mutation-allocated-kuota",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <MutationAllocatedKuota />,
      },
      {
        path: "/detail/:id",
        element: <MutationAllocatedKuota />,
      },
    ],
  },
  {
    path: "/allocated-kuota",
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "",
        element: <AllocatedKuota />,
      },
      {
        path: "/add",
        element: <AddAllocatedKuota />,
      },
      {
        path: "/detail/:id",
        element: <AddAllocatedKuota />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  {
    path: "mobile",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <MobileMenu />,
      },
      {
        path: "inquiry",
        element: <MobileInquiry />,
      },
      {
        path: "inquiry2",
        element: <MobileInquiry2 />,
      },
      {
        path: "listing",
        element: <MobileListing />,
      },
      {
        path: "entry",
        element: <MobileEntry />,
      },
      {
        path: "expiry-date",
        element: <MobileListingExpiryDate />,
      },
    ],
  },
  {
    path: "master-data",
    element: <DashboardLayout />,
    children: [
      {
        path: "vendor",
        element: <Vendor />,
      },
      {
        path: "vendor/:id",
        element: <DetailVendor />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "customer/:id",
        element: <DetailCustomer />,
      },
      {
        path: "warehouse",
        element: <Warehouse />,
      },
      {
        path: "warehouse/:id",
        element: <DetailWarehouse />,
      },
      {
        path: "sales-order",
        element: <SalesOrder />,
      },
      {
        path: "sales-order/:id",
        element: <DetailSalesOrder />,
      },
      {
        path: "stock-item",
        element: <StockItems />,
      },
      {
        path: "stock-item/:id",
        element: <DetailStockItem />,
      },
      {
        path: "issue",
        element: <Issue />,
      },
      {
        path: "issue/:id",
        element: <DetailIssue />,
      },
      {
        path: "branch",
        element: <Branch />,
      },
      {
        path: "branch/:id",
        element: <DetailBranch />,
      },
      {
        path: "location",
        element: <Location />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "employee/:id",
        element: <DetailEmployee />,
      },
      {
        path: "approval",
        element: <Approval />,
      },
      {
        path: "add-approval",
        element: <AddMasterApproval />,
      },
      {
        path: "approval/:id",
        element: <UpdateMasterApproval />,
      },
      {
        path: "department",
        element: <Departement />,
      },
      {
        path: "position",
        element: <Position />,
      },
      {
        path: "master-zona",
        element: <MasterZona />,
      },
      {
        path: "master-zona/:id",
        element: <DetailZona />,
      },
      {
        path: "kategori",
        element: <Kategori />,
      },
      {
        path: "kategori/:id",
        element: <DetailKategori />,
      },
      {
        path: "master-kendaraan",
        element: <MasterKendaraan />,
      },
      {
        path: "add-kendaraan",
        element: <AddMasterKendaraan />,
      },
      {
        path: "update-kendaraan/:id",
        element: <UpdateMasterKendaraan />,
      },
      {
        path: "set-transaksiid",
        element: <SetScreen />,
      },
      {
        path: "set-transaksiid/:id",
        element: <DetailTransaksiID />,
      },
      {
        path: "create-transaksiid",
        element: <DetailTransaksiID />,
      },
      {
        path: "master-promo",
        element: <Promo />,
      },
      {
        path: "master-promo/add",
        element: <DetailMasterPromosi />,
      },
      {
        path: "master-promo/detail/:id",
        element: <DetailMasterPromosi />,
      },
      {
        path: "master-competitor",
        element: <MasterCompetitor />,
      },
      {
        path: "add-competitor",
        element: <UpdateMasterCompetitor />,
      },
      {
        path: "update-competitor/:id",
        element: <UpdateMasterCompetitor />,
      },
      {
        path: "fixed-asset",
        element: <MasterFixedAsset />,
      },
      {
        path: "fixed-asset/:id",
        element: <DetailFixedAsset />,
      },
      {
        path: "receipt",
        element: <Receipt />,
      },
      {
        path: "receipt/add",
        element: <DetailReceipt />,
      },
      {
        path: "receipt/detail/:id",
        element: <DetailReceipt />,
      },
      {
        path: "invoice",
        element: <MasterInvoice />,
      },
      {
        path: "invoice/:id",
        element: <DetailInvoice />,
      },
      {
        path: "master-role",
        element: <MasterRole />,
      },
      {
        path: "master-role/add",
        element: <MasterRoleDetail />,
      },
      {
        path: "master-role/detail/:id",
        element: <MasterRoleDetail />,
      },
      {
        path: "user-role",
        element: <MasterUserRole />,
      },
      {
        path: "user-role/detail/:id",
        element: <MasterUserRoleDetail />,
      },
    ],
  },
  {
    path: "konfigurasi",
    element: <DashboardLayout />,
    children: [
      {
        path: "set-maintenance",
        element: <SetMaintenance />,
      },
      {
        path: "user-registration",
        element: <UserReg />,
      },
      {
        path: "user-registration/add",
        element: <DetailUserReg />,
      },
      {
        path: "set-key",
        element: <SetKey />,
      },
      {
        path: "create-set-key",
        element: <DetailSetKey />,
      },
      {
        path: "set-key/:id",
        element: <DetailSetKey />,
      },
      {
        path: "set-server-email",
        element: <SetServerEmail />,
      },
      {
        path: "numbering-sequences",
        element: <NumberingSequences />,
      },
      {
        path: "numbering-sequences/add",
        element: <NumberingSequenceDetail />,
      },
      {
        path: "numbering-sequences/detail/:id",
        element: <NumberingSequenceDetail />,
      },
      {
        path: "screen-number",
        element: <ScreenNumber />,
      },
      {
        path: "screen-number/add",
        element: <DetailScreenNumber />,
      },
      {
        path: "screen-number/detail/:id",
        element: <DetailScreenNumber />,
      },
      {
        path: "user-role",
        element: <UserRole />,
      },
      {
        path: "user-role/add",
        element: <DetailUserRole />,
      },
      {
        path: "user-role/detail/:id",
        element: <DetailUserRole />,
      },
      {
        path: "notifikasi-template",
        element: <NotifikasiTemplate />,
      },
      {
        path: "notifikasi-template/add",
        element: <AddNotifikasiTemplate />,
      },
      {
        path: "notifikasi-template/update/:id",
        element: <UpdateNotifikasiTemplate />,
      },
      {
        path: "user-setting",
        element: <UserSetting />,
      },
      {
        path: "scheduller",
        element: <Scheduller />,
      },
    ],
  },
  {
    path: "testing",
    element: <DashboardLayout />,
    children: [
      {
        path: "tabel",
        element: <Table />,
      },
      {
        path: "multiple-dropdown",
        element: <MultipleDropdown />,
      },
      {
        path: "error-input",
        element: <ErrorInput />,
      },
    ],
  },
];

export default routes;
