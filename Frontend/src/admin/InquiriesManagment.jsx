import { useEffect, useMemo, useState } from "react";

import {
  getInquiries,
  updateInquiry,
  deleteInquiry,
} from "../utils/inquiryStorage";

import {
  MessageSquare,
  Clock3,
  RefreshCw,
  CheckCircle2,
  Search,
  Eye,
  Trash2,
  X,
  Mail,
  Phone,
  User,
  CalendarDays,
  Tag,
  ChevronDown,
  Inbox,
} from "lucide-react";

const InquiriesManagment = () => {
  // ================= STATES =================

  const [inquiries, setInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");

  // ================= LOAD DATA =================

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = () => {
    const data = getInquiries();
    setInquiries(data);
  };

  // ================= COUNTS =================

  const totalCount = inquiries.length;

  const newCount = inquiries.filter(
    (item) => item.status === "New"
  ).length;

  const progressCount = inquiries.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolvedCount = inquiries.filter(
    (item) => item.status === "Resolved"
  ).length;

  // ================= SEARCH + FILTER =================

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        item.id?.toLowerCase().includes(searchText) ||
        item.customerId?.toLowerCase().includes(searchText) ||
        item.fullName?.toLowerCase().includes(searchText) ||
        item.email?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        item.status === statusFilter;

      const matchesType =
        typeFilter === "All Types" ||
        item.type === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    inquiries,
    search,
    statusFilter,
    typeFilter,
  ]);

  // ================= STATUS UPDATE =================

  const handleStatusChange = (id, status) => {
    const updated = updateInquiry(id, {
      status: status,
    });

    setInquiries(updated);

    setSelectedInquiry((previous) => {
      if (!previous) {
        return null;
      }

      if (previous.id !== id) {
        return previous;
      }

      return {
        ...previous,
        status: status,
      };
    });
  };

  // ================= DELETE =================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );

    if (!confirmDelete) {
      return;
    }

    const updated = deleteInquiry(id);

    setInquiries(updated);

    if (
      selectedInquiry &&
      selectedInquiry.id === id
    ) {
      setSelectedInquiry(null);
    }
  };

  // ================= DATE =================

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ================= STATUS STYLE =================

  const getStatusClass = (status) => {
    if (status === "Resolved") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }

    if (status === "In Progress") {
      return "bg-amber-50 text-amber-700 border border-amber-200";
    }

    return "bg-blue-50 text-blue-700 border border-blue-200";
  };

  // ================= TYPE STYLE =================

  const getTypeClass = (type) => {
    if (type === "Pickup Request") {
      return "bg-amber-50 text-amber-700 border border-amber-200";
    }

    if (type === "Delivery Issue") {
      return "bg-red-50 text-red-700 border border-red-200";
    }

    if (type === "Meal / Menu") {
      return "bg-purple-50 text-purple-700 border border-purple-200";
    }

    if (type === "Subscription") {
      return "bg-blue-50 text-blue-700 border border-blue-200";
    }

    if (type === "Payment Issue") {
      return "bg-orange-50 text-orange-700 border border-orange-200";
    }

    return "bg-emerald-50 text-emerald-700 border border-emerald-200";
  };

  // ================= UI =================

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-7">

        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <MessageSquare size={22} />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                Inquiry Management
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage and respond to customer inquiries
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
          <Inbox size={17} />
          <span>
            {filteredInquiries.length} inquiries
          </span>
        </div>

      </div>

      {/* ================= STATISTICS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">

        {/* Total */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Inquiries
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {totalCount}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                All customer requests
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MessageSquare size={23} />
            </div>

          </div>

        </div>

        {/* New */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                New
              </p>

              <h2 className="text-3xl font-bold text-blue-600 mt-2">
                {newCount}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Awaiting response
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Clock3 size={23} />
            </div>

          </div>

        </div>

        {/* In Progress */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                In Progress
              </p>

              <h2 className="text-3xl font-bold text-amber-600 mt-2">
                {progressCount}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Currently being handled
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <RefreshCw size={23} />
            </div>

          </div>

        </div>

        {/* Resolved */}

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Resolved
              </p>

              <h2 className="text-3xl font-bold text-emerald-600 mt-2">
                {resolvedCount}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Successfully completed
              </p>
            </div>

            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={23} />
            </div>

          </div>

        </div>

      </div>

      {/* ================= SEARCH & FILTER ================= */}

      <div className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5 mb-6 shadow-sm">

        <div className="flex flex-col xl:flex-row gap-3">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search customer ID, name or email..."
              className="w-full h-12 border border-slate-200 bg-slate-50 rounded-xl pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:bg-white focus:border-red-400 focus:ring-4 focus:ring-red-50"
            />

          </div>

          {/* Status */}

          <div className="relative">

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="appearance-none w-full xl:w-48 h-12 border border-slate-200 bg-slate-50 rounded-xl px-4 pr-10 text-sm text-slate-700 outline-none cursor-pointer focus:bg-white focus:border-red-400"
            >
              <option value="All Status">
                All Status
              </option>

              <option value="New">
                New
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>
            </select>

            <ChevronDown
              size={17}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />

          </div>

          {/* Type */}

          <div className="relative">

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
              className="appearance-none w-full xl:w-52 h-12 border border-slate-200 bg-slate-50 rounded-xl px-4 pr-10 text-sm text-slate-700 outline-none cursor-pointer focus:bg-white focus:border-red-400"
            >

              <option value="All Types">
                All Types
              </option>

              <option value="General Query">
                General Query
              </option>

              <option value="Pickup Request">
                Pickup Request
              </option>

              <option value="Delivery Issue">
                Delivery Issue
              </option>

              <option value="Meal / Menu">
                Meal / Menu
              </option>

              <option value="Subscription">
                Subscription
              </option>

              <option value="Payment Issue">
                Payment Issue
              </option>

            </select>

            <ChevronDown
              size={17}
              className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
            />

          </div>

        </div>

        {/* Active Filter Info */}

        <div className="flex flex-wrap items-center gap-2 mt-4">

          <span className="text-xs text-slate-400">
            Showing
          </span>

          <span className="text-xs font-semibold text-slate-700">
            {filteredInquiries.length}
          </span>

          <span className="text-xs text-slate-400">
            of
          </span>

          <span className="text-xs font-semibold text-slate-700">
            {totalCount}
          </span>

          <span className="text-xs text-slate-400">
            inquiries
          </span>

        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Table Header */}

        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">

          <div>
            <h2 className="font-semibold text-slate-800">
              Customer Inquiries
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Review and manage all submitted inquiries
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <MessageSquare size={15} />
            {filteredInquiries.length} Records
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-slate-50 border-b border-slate-200">

              <tr>

                <th className="text-left px-5 py-4 text-[11px] font-bold tracking-wide text-slate-500">
                  CUSTOMER
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold tracking-wide text-slate-500">
                  TYPE
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold tracking-wide text-slate-500">
                  STATUS
                </th>

                <th className="text-left px-5 py-4 text-[11px] font-bold tracking-wide text-slate-500">
                  RECEIVED
                </th>

                <th className="text-center px-5 py-4 text-[11px] font-bold tracking-wide text-slate-500">
                  ACTIONS
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredInquiries.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-20"
                  >

                    <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                      <Inbox size={28} />
                    </div>

                    <p className="font-semibold text-slate-700">
                      No inquiries found
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                      Try changing your search or filters.
                    </p>

                  </td>

                </tr>

              ) : (

                filteredInquiries.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-slate-100 hover:bg-slate-50/70 transition"
                  >

                    {/* CUSTOMER */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center font-bold">
                          {item.fullName
                            ?.charAt(0)
                            ?.toUpperCase() || "U"}
                        </div>

                        <div>

                          <button
                            onClick={() =>
                              setSelectedInquiry(item)
                            }
                            className="font-semibold text-slate-800 hover:text-red-500 transition text-left"
                          >
                            {item.fullName}
                          </button>

                          <p className="text-xs text-slate-400 mt-0.5">
                            {item.customerId}
                          </p>

                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* TYPE */}

                    <td className="px-5 py-4">

                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold ${getTypeClass(
                          item.type
                        )}`}
                      >
                        {item.type}
                      </span>

                    </td>

                    {/* STATUS */}

                    <td className="px-5 py-4">

                      <div className="relative inline-block">

                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(
                              item.id,
                              e.target.value
                            )
                          }
                          className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-semibold outline-none cursor-pointer ${getStatusClass(
                            item.status
                          )}`}
                        >

                          <option value="New">
                            New
                          </option>

                          <option value="In Progress">
                            In Progress
                          </option>

                          <option value="Resolved">
                            Resolved
                          </option>

                        </select>

                        <ChevronDown
                          size={13}
                          className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                        />

                      </div>

                    </td>

                    {/* DATE */}

                    <td className="px-5 py-4">

                      <div className="flex items-center gap-2 text-sm text-slate-600">

                        <CalendarDays
                          size={15}
                          className="text-slate-400"
                        />

                        {formatDate(item.receivedAt)}

                      </div>

                    </td>

                    {/* ACTIONS */}

                    <td className="px-5 py-4">

                      <div className="flex justify-center items-center gap-2">

                        {/* VIEW */}

                        <button
                          onClick={() =>
                            setSelectedInquiry(item)
                          }
                          title="View Inquiry"
                          className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"
                        >
                          <Eye size={17} />
                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(item.id)
                          }
                          title="Delete Inquiry"
                          className="w-9 h-9 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================================= */}
      {/* ================= DETAILS MODAL ================= */}
      {/* ================================================= */}

      {selectedInquiry && (

        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl max-h-[92vh] overflow-hidden">

            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                  <MessageSquare size={21} />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-800">
                    Inquiry Details
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    {selectedInquiry.id}
                  </p>

                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedInquiry(null)
                }
                className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <X size={19} />
              </button>

            </div>

            {/* MODAL BODY */}

            <div className="p-6 overflow-y-auto max-h-[calc(92vh-82px)]">

              {/* CUSTOMER CARD */}

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold">
                    {selectedInquiry.fullName
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>

                  <div>

                    <h3 className="font-bold text-lg text-slate-800">
                      {selectedInquiry.fullName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {selectedInquiry.email}
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      Customer ID:{" "}
                      {selectedInquiry.customerId}
                    </p>

                  </div>

                </div>

              </div>

              {/* DETAILS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Full Name */}

                <div className="border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-slate-400 mb-2">

                    <User size={15} />

                    <p className="text-xs font-semibold uppercase tracking-wide">
                      Full Name
                    </p>

                  </div>

                  <p className="font-semibold text-slate-800">
                    {selectedInquiry.fullName}
                  </p>

                </div>

                {/* Email */}

                <div className="border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-slate-400 mb-2">

                    <Mail size={15} />

                    <p className="text-xs font-semibold uppercase tracking-wide">
                      Email
                    </p>

                  </div>

                  <p className="font-semibold text-slate-800 break-all">
                    {selectedInquiry.email}
                  </p>

                </div>

                {/* Phone */}

                <div className="border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-slate-400 mb-2">

                    <Phone size={15} />

                    <p className="text-xs font-semibold uppercase tracking-wide">
                      Phone
                    </p>

                  </div>

                  <p className="font-semibold text-slate-800">
                    {selectedInquiry.phone || "N/A"}
                  </p>

                </div>

                {/* Customer Since */}

                <div className="border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-slate-400 mb-2">

                    <CalendarDays size={15} />

                    <p className="text-xs font-semibold uppercase tracking-wide">
                      Customer Since
                    </p>

                  </div>

                  <p className="font-semibold text-slate-800">
                    {selectedInquiry.customerSince ||
                      "N/A"}
                  </p>

                </div>

                {/* Inquiry Type */}

                <div className="border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-slate-400 mb-2">

                    <Tag size={15} />

                    <p className="text-xs font-semibold uppercase tracking-wide">
                      Inquiry Type
                    </p>

                  </div>

                  <span
                    className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold ${getTypeClass(
                      selectedInquiry.type
                    )}`}
                  >
                    {selectedInquiry.type}
                  </span>

                </div>

                {/* STATUS */}

                <div className="border border-slate-200 rounded-xl p-4">

                  <div className="flex items-center gap-2 text-slate-400 mb-2">

                    <RefreshCw size={15} />

                    <p className="text-xs font-semibold uppercase tracking-wide">
                      Status
                    </p>

                  </div>

                  <div className="relative inline-block">

                    <select
                      value={
                        selectedInquiry.status
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          selectedInquiry.id,
                          e.target.value
                        )
                      }
                      className={`appearance-none pl-3 pr-9 py-2 rounded-lg text-xs font-semibold outline-none cursor-pointer ${getStatusClass(
                        selectedInquiry.status
                      )}`}
                    >

                      <option value="New">
                        New
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Resolved">
                        Resolved
                      </option>

                    </select>

                    <ChevronDown
                      size={14}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    />

                  </div>

                </div>

              </div>

              {/* RECEIVED */}

              <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">

                <CalendarDays size={16} />

                <span>
                  Received on{" "}
                  <span className="font-semibold text-slate-700">
                    {formatDate(
                      selectedInquiry.receivedAt
                    )}
                  </span>
                </span>

              </div>

              {/* MESSAGE */}

              <div className="mt-6">

                <p className="text-xs uppercase tracking-wide font-bold text-slate-500 mb-2">
                  Customer Message
                </p>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">

                  <p className="text-slate-700 leading-7 whitespace-pre-wrap">
                    {selectedInquiry.message ||
                      "No message provided."}
                  </p>

                </div>

              </div>

              {/* ACTION BUTTONS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">

                {/* EMAIL */}

                <a
                  href={`mailto:${selectedInquiry.email}?subject=Regarding your TiffinBox Inquiry ${selectedInquiry.id}`}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition shadow-sm"
                >
                  <Mail size={18} />
                  Reply via Email
                </a>

                {/* RESOLVE */}

                <button
                  onClick={() =>
                    handleStatusChange(
                      selectedInquiry.id,
                      "Resolved"
                    )
                  }
                  disabled={
                    selectedInquiry.status ===
                    "Resolved"
                  }
                  className={`flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition ${
                    selectedInquiry.status ===
                    "Resolved"
                      ? "bg-emerald-50 text-emerald-600 cursor-default"
                      : "bg-emerald-500 hover:bg-emerald-600 text-white"
                  }`}
                >

                  <CheckCircle2 size={18} />

                  {selectedInquiry.status ===
                  "Resolved"
                    ? "Already Resolved"
                    : "Mark as Resolved"}

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default InquiriesManagment;