import React from "react";
import useAuth from "../auth/useAuth";
import DashboardCards from "../components/DashboardCards";
import IssueList from "../components/IssueList";
import IssueForm from "../components/IssueForm";
import NotificationList from "../components/NotificationList";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {user?.name}</h2>
      <p>
        Role: <strong>{user?.role}</strong>
      </p>
      <hr />
      <DashboardCards />
      <hr />
      <IssueForm />
      <IssueList />
      <hr />
      <NotificationList />
    </div>
  );
}
