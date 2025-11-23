import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Backdrop, CircularProgress, Divider, Box } from "@mui/material";

import Nav from "../../../Layout/Nav/Nav";
import Sidebar from "../../../Layout/Sidebar/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DateRangeIcon from "@mui/icons-material/DateRange";
import MaintenanceViewerDrawer from "./MaintenanceViewerDrawer";
import { Scheduler } from "@aldabil/react-scheduler";
import AuthContext from "../../../AuthProvider/AuthContext";
import { url } from "../../../Config";

import MaintenancePlanForm from "./MaintenanceEditForm";
import MaintenanceCard from "../../OperatorView/MaintenanceCard";
import AssetCard from "../../OperatorView/AssetCard";

import { Link as RouterLink } from "react-router-dom";

const breadcrumbs = [
    <RouterLink to={"/"} replace={true}>
        Home
    </RouterLink>,
    <Typography key="agenda-breadcrumb" color="text.primary">
        Agenda
    </Typography>
];

class Agenda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_loading: true,
            maintenances: [],
            assets: [],
            users: [],
            show_form: false,
            maintenance_plan: {}, // empty or plan object
            show_viewer: false,
            current_view_item: null
        };

        this.refreshData = this.refreshData.bind(this);
        this.handleOnEventEdit = this.handleOnEventEdit.bind(this);
        this.handleOnCellClick = this.handleOnCellClick.bind(this);
        this.handleOnDelete = this.handleOnDelete.bind(this);
        this.handleOnCloseForm = this.handleOnCloseForm.bind(this);
        this.handleOnUpdate = this.handleOnUpdate.bind(this);
    }

    async refreshData() {
        this.setState({ is_loading: true });

        try {
            const [mRes, aRes, uRes] = await Promise.all([
                axios.get(url + "/api/v1/maintenances/", {
                    headers: { Authorization: "Token " + this.context.state.token }
                }),
                axios.get(url + "/api/v1/assets/", {
                    headers: { Authorization: "Token " + this.context.state.token }
                }),
                axios.get(url + "/api/v1/profile-users/", {
                    headers: { Authorization: "Token " + this.context.state.token }
                })
            ]);

            this.setState({
                maintenances: mRes.data,
                assets: aRes.data,
                users: uRes.data
            });
        } catch (error) {
            toast.error("Error loading data: " + (error?.response?.data?.detail || error));
        } finally {
            this.setState({ is_loading: false });
        }
    }

    componentDidMount() {
        this.refreshData();
    }

    handleOnEventEdit(event) {

        const item = this.state.maintenances.find((m) => m.uuid === event.id);
        this.setState({
            maintenance_plan: item || {},
            show_form: true
        });
    }

    handleOnCellClick(start, end) {
        start.setHours(start.getHours() + 2);
        end.setHours(end.getHours() + 2);

        this.setState({
            maintenance_plan: {
                uuid: "",
                planned_starting_date: start.toISOString(),
                planned_finished: end.toISOString()
            },
            show_form: true
        });
    }

    async handleOnDelete(id) {
        this.setState({ is_loading: true });

        try {
            await axios.delete(url + "/api/v1/maintenances-plans/" + id + "/", {
                headers: { Authorization: "Token " + this.context.state.token }
            });

            toast.success("Maintenance plan deleted.");
            this.refreshData();
        } catch (error) {
            toast.error("Error deleting: " + error);
        } finally {
            this.setState({ is_loading: false });
        }
    }

    handleOnCloseForm() {
        this.setState({ show_form: false });
    }

    handleOnUpdate() {
        this.setState({ show_form: false }, this.refreshData);
    }

    render() {
        const { maintenances, users, assets, maintenance_plan } = this.state;

        const events = maintenances.map((m, index) => ({
            id: m.uuid,
            title: m.name,
            start: new Date(m.planned_starting_date),
            end: new Date(m.planned_finished),
            color: {
                Cancelled: "error.main",
                Pending: "secondary.main",
                "In Progress": "info.main",
                Completed: "success.main"
            }[m.status],
            description: `Asset: ${m.asset?.name}\nAssigned to: ${m.assigned_to?.username}`
        }));

        return (
            <>
                <ToastContainer />

                {/* GLOBAL BACKDROP */}
                <Backdrop
                    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.is_loading}
                >
                    <CircularProgress />
                </Backdrop>


                <div className="content-wrapper">
                    <div className="content-header">
                        <Stack
                            spacing={2}
                            direction="row"
                            justifyContent={"space-between"}
                            sx={{ mb: 2, p: 1 }}
                        >
                            <DateRangeIcon />
                            <Breadcrumbs separator="›">{breadcrumbs}</Breadcrumbs>
                        </Stack>
                    </div>

                    <div className="container-fluid">
                        <Scheduler
                            view="month"
                            events={events}
                            timeZone="CET"
                            draggable={false}
                            hourFormat={24}

                            /** Disable all internal modals */
                            viewer={false}
                            editable={false}
                            eventViewerComponent={() => null}
                            eventEditorComponent={() => null}

                            customViewer={() => null}
                            onEventClick={(event) => {
                                const item = this.state.maintenances.find((m) => m.uuid === event.id);
                                this.setState({
                                    show_viewer: true,
                                    current_view_item: item
                                });
                                return false; // 🚫 STOP DEFAULT VIEWER POPUP
                            }}

                            /** ⛔ Remove onEventEdit to avoid default popup */
                            onEventEdit={null}

                            onDelete={this.handleOnDelete}
                            onCellClick={this.handleOnCellClick}

                            day={{ startHour: 0, endHour: 24, step: 60 }}
                            week={{
                                weekDays: [0, 1, 2, 3, 4, 5, 6],
                                weekStartOn: 6,
                                startHour: 0,
                                endHour: 24,
                                step: 60,
                                navigation: true
                            }}
                        />
                    </div>
                </div>

                {/* 🔥 DRAWER IS OUTSIDE THE SCHEDULER (correct placement) */}
                <MaintenancePlanForm
                    show={this.state.show_form}
                    handleClose={this.handleOnCloseForm}
                    maintenancePlan={maintenance_plan}
                    users={users}
                    assets={assets}
                    OnUpdate={this.handleOnUpdate}
                />
                <MaintenanceViewerDrawer
                    open={this.state.show_viewer}
                    maintenance={this.state.current_view_item}
                    onClose={() => this.setState({ show_viewer: false })}
                    assets={assets}
                    users={users}
                />
            </>

        );
    }
}

Agenda.contextType = AuthContext;
export default Agenda;
