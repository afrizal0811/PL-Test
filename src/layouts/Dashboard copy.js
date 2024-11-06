import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components/macro";

import { spacing } from "@material-ui/system";
import { CssBaseline, Hidden, Paper as MuiPaper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Footer from "../components/Footer";
import GlobalStyle from "../components/GlobalStyle";
import Navbar from "../components/navbar/Navbar";
import dashboardItems from "../components/sidebar/dashboardItems";
import Sidebar from "../components/sidebar/Sidebar";
// import Settings from "../components/Settings";

const drawerWidth = 258;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Drawer = styled.div`
  ${(props) => props.theme.breakpoints.up("md")} {
    width: ${drawerWidth}px;
    flex-shrink: 0;
  }
`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 100%;
`;

const Paper = styled(MuiPaper)(spacing);

const MainContent = styled(Paper)`
  flex: 1;
  background: ${(props) => props.theme.palette.background.default};

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }
`;

const Dashboard = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  useEffect(() => {
    if (
      getAkses().split(",")?.includes("SAW300012") &&
      docsSection.filter((ae) => ae.title === "Dashboard Approval").length == 0
    ) {
      setdocsSection(
        docsSection.concat({
          href: "/dashboard-approval",
          icon: Sliders,
          title: "Dashboard Approval",
        })
      );
    }

    //erp
    if (
      getAkses().split(",")?.includes("SAW200002") &&
      pagesSection.filter((ae) => ae.title === "Allocated Kuota").length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/allocated-kuota",
          icon: Outbound,
          title: "Allocated Kuota",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAC300007") &&
      pagesSection.filter((ae) => ae.title === "Expiry Date").length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/expiry-date",
          icon: Timer,
          title: "Expiry Date",
        })
      );
    }

    if (
      getAkses().split(",")?.includes("SAC300002") &&
      pagesSection.filter((ae) => ae.title === "Promotion Activity").length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/promo-activity",
          icon: LocalOffer,
          title: "Promotion Activity",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAC300004") &&
      pagesSection.filter((ae) => ae.title === "Competitor Price Information")
        .length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/competitor-price-info",
          icon: PriceCheck,
          title: "Competitor Price Information",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAC300005") &&
      pagesSection.filter((ae) => ae.title === "Customer Price Information")
        .length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/customer-price-info",
          icon: RequestQuote,
          title: "Customer Price Information",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW300011") &&
      pagesSection.filter((ae) => ae.title === "List SO Otorisasi").length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/list-so-otorisasi",
          icon: CreditCard,
          title: "List SO Otorisasi",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW200001") &&
      pagesSection.filter((ae) => ae.title === "Change Lot Nbr & Exp Date")
        .length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/change-lot-nbr-exp-date",
          icon: LotTicket,
          title: "Change Lot Nbr & Exp Date",
        })
      );
    }
    // if (
    //   getAkses().split(",")?.includes("SAW200005") &&
    //   pagesSection.filter((ae) => ae.title === "Transfer Kuota").length == 0
    // ) {
    //   setpagesSection(
    //     pagesSection.concat({
    //       href: "/transfer-kuota",
    //       icon: CompareArrows,
    //       title: "Transfer Kuota",
    //     })
    //   );
    // }
    if (
      getAkses().split(",")?.includes("SAW200004") &&
      pagesSection.filter((ae) => ae.title === "Transfer Kuota").length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/transfer-kuota",
          icon: CompareArrows,
          title: "Transfer Kuota",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW600002") &&
      pagesSection.filter((ae) => ae.title === "Mutation Allocated Kuota")
        .length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/mutation-allocated-kuota",
          icon: MultipleStop,
          title: "Mutation Allocated Kuota",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW200003") &&
      pagesSection.filter((ae) => ae.title === "Transfer Cabang").length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/transfer-cabang",
          icon: CompareArrows,
          title: "Transfer Cabang",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAF300003") &&
      pagesSection.filter((ae) => ae.title === "Desk Call").length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/desk-call",
          icon: PhoneCall,
          title: "Desk Call",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAF300002") &&
      pagesSection.filter(
        (ae) => ae.title === "Laporan Harian Inkaso (Kolektor)"
      ).length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          // href: "/change-lot-nbr-exp-date",
          icon: PendingActions,
          href: "/laporan-harian-inkaso/mobile",
          title: "Laporan Harian Inkaso (Kolektor)",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAF300001") &&
      pagesSection.filter((ae) => ae.title === "Laporan Harian Inkaso")
        .length == 0
    ) {
      setpagesSection(
        pagesSection.concat({
          href: "/laporan-harian-inkaso",
          icon: PendingActions,
          title: "Laporan Harian Inkaso",
        })
      );
    }

    //master
    if (
      getAkses().split(",")?.includes("SAW300003") &&
      masterDataSection.filter((ae) => ae.title === "Vendor").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/vendor",
          icon: GroupWork,
          title: "Vendor",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW300009") &&
      masterDataSection.filter((ae) => ae.title === "Stock Item").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/stock-item",
          icon: ArchiveRounded,
          title: "Stock Item",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAG300005") &&
      masterDataSection.filter((ae) => ae.title === "Approval").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/approval",
          icon: ApprovalTwoTone,
          title: "Approval",
        })
      );
    }
    // if (
    //   getAkses().split(",")?.includes("SW300001") &&
    //   masterDataSection.filter((ae) => ae.title === "Kategori").length == 0
    // ) {
    //   setmasterDataSection(
    //     masterDataSection.concat({
    //       href: "/master-data/kategori",
    //       icon: Grid,
    //       title: "Kategori",
    //     })
    //   );
    // }
    if (
      getAkses().split(",")?.includes("SAG300003") &&
      masterDataSection.filter((ae) => ae.title === "Position").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/position",
          icon: AddLocation,
          title: "Position",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW300007") &&
      masterDataSection.filter((ae) => ae.title === "Shipping Zone").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/master-zona",
          icon: Maps,
          title: "Shipping Zone",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAG300001") &&
      masterDataSection.filter((ae) => ae.title === "Branch").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/branch",
          icon: AccountTree,
          title: "Branch",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW300006") &&
      masterDataSection.filter((ae) => ae.title === "Sales Order").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/sales-order",
          icon: BorderColorRounded,
          title: "Sales Order",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW300002") &&
      masterDataSection.filter((ae) => ae.title === "Customer").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/customer",
          icon: Users,
          title: "Customer",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAG300004") &&
      masterDataSection.filter((ae) => ae.title === "Employee").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/employee",
          icon: Person,
          title: "Employee",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAC300001") &&
      masterDataSection.filter((ae) => ae.title === "Master Promotion")
        .length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/master-promo",
          icon: LocalOffer,
          title: "Master Promotion",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAC300003") &&
      masterDataSection.filter((ae) => ae.title === "Master Competitor")
        .length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/master-competitor",
          icon: AutoGraph,
          title: "Master Competitor",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAG300006") &&
      masterDataSection.filter((ae) => ae.title === "Transaksi ID").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/set-transaksiid",
          icon: Receipt,
          title: "Transaksi ID",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW300005") &&
      masterDataSection.filter((ae) => ae.title === "Master Invoice").length ==
        0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/invoice",
          icon: Receipt,
          title: "Master Invoice",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAW300001") &&
      masterDataSection.filter((ae) => ae.title === "Warehouse").length == 0
    ) {
      setmasterDataSection(
        masterDataSection.concat({
          href: "/master-data/warehouse",
          icon: AccountBalance,
          title: "Warehouse",
        })
      );
    }

    //konfig
    if (
      getAkses().split(",")?.includes("SAG100002") &&
      konfigurasiSection.filter((ae) => ae.title === "Setup Server Email")
        .length === 0
    ) {
      setkonfigurasiSection(
        konfigurasiSection.concat({
          href: "/konfigurasi/set-server-email",
          icon: Email,
          title: "Setup Server Email",
          // badge: "v3.0.0",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAG100003") &&
      konfigurasiSection.filter((ae) => ae.title === "Notifikasi Template")
        .length === 0
    ) {
      setkonfigurasiSection(
        konfigurasiSection.concat({
          href: "/konfigurasi/notifikasi-template",
          icon: Layout,
          title: "Notifikasi Template",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAG100005") &&
      konfigurasiSection.filter((ae) => ae.title === "Setup User Registration")
        .length === 0
    ) {
      setkonfigurasiSection(
        konfigurasiSection.concat({
          href: "/konfigurasi/user-registration",
          icon: ManageAccounts,
          title: "Setup User Registration",
          // badge: "v3.0.0",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAG100004") &&
      konfigurasiSection.filter((ae) => ae.title === "Master Role").length === 0
    ) {
      setkonfigurasiSection(
        konfigurasiSection.concat({
          href: "/master-data/master-role",
          icon: Users,
          title: "Master Role",
        })
      );
    }
    if (
      getAkses().split(",")?.includes("SAG100001") &&
      konfigurasiSection.filter((ae) => ae.title === "User Roles").length === 0
    ) {
      setkonfigurasiSection(
        konfigurasiSection.concat({
          href: "/master-data/user-role",
          icon: Users,
          title: "User Roles",
        })
      );
    }
    setnavItems([
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
      {
        title: "Konfigurasi",
        pages: konfigurasiSection,
      },
    ]);
    console.log("doc", docsSection);
  }, [docsSection, konfigurasiSection, pagesSection, masterDataSection]);

  // useEffect(() => {
  //   console.log("nav", navItems);

  // }, [pagesSection, masterDataSection, konfigurasiSection, docsSection]);

  return (
    <Root>
      <CssBaseline />
      <GlobalStyle />
      <Drawer>
        <Hidden lgUp implementation="js">
          <Sidebar
            Mobile={true}
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onClick={handleDrawerToggle}
            items={dashboardItems}
            // items={navItems}
          />
        </Hidden>
        <Hidden mdDown implementation="css">
          <Sidebar
            PaperProps={{ style: { width: drawerWidth, zIndex: 1 } }}
            items={dashboardItems}
            // items={navItems}
          />
        </Hidden>
      </Drawer>
      <AppContent>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <MainContent p={isLgUp ? 12 : 5}>
          {children}
          <Outlet />
        </MainContent>
        <Footer />
      </AppContent>
      {/* <Settings /> */}
    </Root>
  );
};

export default Dashboard;
