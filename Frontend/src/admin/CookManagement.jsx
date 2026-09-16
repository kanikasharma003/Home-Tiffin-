import React, { useState, useEffect } from "react";
import {
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Utensils,
  Store,
} from "lucide-react";
import {
  getApplications,
  updateApplicationStatus,
} from "../utils/cookApplications";

const CookManagement = () => {
  const [cooks, setCooks] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | approved | rejected
  const [search, setSearch] = useState("");
  const [selectedCook, setSelectedCook] = useState(null);

  // Load applications whenever the page mounts
  useEffect(() => {
    setCooks(getApplications());
  }, []);

  //  Stats
  const stats = {
    total: cooks.length,
    pending: cooks.filter((c) => c.status === "pending").length,
    approved: cooks.filter((c) => c.status === "approved").length,
    rejected: cooks.filter((c) => c.status === "rejected").length,
  };

  //  Filter + Search
  const filteredCooks = cooks.filter((c) => {
    const matchesFilter = filter === "all" || c.status === filter;
    const q = search.toLowerCase();
    const matchesSearch =
      (c.name || "").toLowerCase().includes(q) ||
      (c.email || "").toLowerCase().includes(q) ||
      (c.city || "").toLowerCase().includes(q) ||
      (c.kitchenName || "").toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  //  Actions
  const updateStatus = (id, status) => {
    const next = updateApplicationStatus(id, status);
    setCooks(next);
    setSelectedCook(null);
  };

  const statusBadge = (status) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      approved: "bg-green-100 text-green-700 border-green-200",
      rejected: "bg-red-100 text-red-700 border-red-200",
    };
    return map[status] || "bg-gray-100 text-gray-600";
  };

  const initials = (name) =>
    (name || "?")
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans text-gray-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Cook Management
          </h1>
          <p className="text-gray-500 mt-1">
            Review and verify applications from home cooks who want to join
            TiffinBox.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Applications",
              value: stats.total,
              color: "text-gray-900",
              bg: "bg-white",
            },
            {
              label: "Pending Review",
              value: stats.pending,
              color: "text-yellow-600",
              bg: "bg-yellow-50",
            },
            {
              label: "Approved Cooks",
              value: stats.approved,
              color: "text-green-600",
              bg: "bg-green-50",
            },
            {
              label: "Rejected",
              value: stats.rejected,
              color: "text-red-600",
              bg: "bg-red-50",
            },
          ].map((s, i) => (
            <div
              key={i}
              className={`${s.bg} rounded-2xl p-5 border border-gray-100 shadow-sm`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                {s.label}
              </p>
              <p className={`text-3xl font-bold mt-2 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            {["all", "pending", "approved", "rejected"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${
                  filter === f
                    ? "bg-[#E53935] text-white shadow"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#E53935] hover:text-[#E53935]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#E53935]"
            />
          </div>
        </div>

        {/* Cooks Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {filteredCooks.length === 0 ? (
            <div className="p-16 text-center text-gray-400">
              <Utensils size={40} className="mx-auto mb-3 opacity-40" />
              <p>No cooks found matching your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Cook
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Location
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Applied On
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCooks.map((cook) => (
                    <tr
                      key={cook.id}
                      className="hover:bg-[#FFF9F5] transition-colors"
                    >
                      {/* Cook */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {cook.avatar ? (
                            <img
                              src={cook.avatar}
                              alt={cook.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-[#FFEBEB] text-[#E53935] flex items-center justify-center font-bold text-sm">
                              {initials(cook.name)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-gray-900">
                              {cook.name}
                            </p>
                            {cook.kitchenName && (
                              <p className="text-xs text-[#E53935] font-medium flex items-center gap-1">
                                <Store size={11} /> {cook.kitchenName}
                              </p>
                            )}
                            <p className="text-xs text-gray-500 truncate max-w-[180px]">
                              {cook.specialties}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Phone size={12} /> {cook.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Mail size={12} /> {cook.email}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-sm text-gray-700">
                          <MapPin size={14} className="text-[#E53935]" />
                          {cook.city}
                        </div>
                      </td>

                      {/* Applied On */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {cook.appliedOn}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border capitalize ${statusBadge(
                            cook.status
                          )}`}
                        >
                          {cook.status === "pending" && <Clock size={12} />}
                          {cook.status === "approved" && (
                            <CheckCircle2 size={12} />
                          )}
                          {cook.status === "rejected" && <XCircle size={12} />}
                          {cook.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedCook(cook)}
                            className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:text-[#E53935] hover:border-[#E53935] transition-colors"
                            title="View details"
                          >
                            <Eye size={16} />
                          </button>

                          {cook.status !== "approved" && (
                            <button
                              onClick={() => updateStatus(cook.id, "approved")}
                              className="p-2 rounded-lg border border-green-200 text-green-600 hover:bg-green-50 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle2 size={16} />
                            </button>
                          )}

                          {cook.status !== "rejected" && (
                            <button
                              onClick={() => updateStatus(cook.id, "rejected")}
                              className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                              title="Reject"
                            >
                              <XCircle size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedCook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  {selectedCook.avatar ? (
                    <img
                      src={selectedCook.avatar}
                      alt={selectedCook.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-[#FFEBEB] text-[#E53935] flex items-center justify-center font-bold">
                      {initials(selectedCook.name)}
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {selectedCook.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedCook.city}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCook(null)}
                  className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {selectedCook.kitchenName && (
                  <DetailRow
                    icon={<Store size={16} />}
                    label="Kitchen Name"
                    value={selectedCook.kitchenName}
                  />
                )}
                <DetailRow
                  icon={<Phone size={16} />}
                  label="Phone"
                  value={selectedCook.phone}
                />
                <DetailRow
                  icon={<Mail size={16} />}
                  label="Email"
                  value={selectedCook.email}
                />
                <DetailRow
                  icon={<MapPin size={16} />}
                  label="City"
                  value={selectedCook.city}
                />
                <DetailRow
                  icon={<Utensils size={16} />}
                  label="Specialties"
                  value={selectedCook.specialties}
                />
                <DetailRow
                  icon={<User size={16} />}
                  label="Experience"
                  value={selectedCook.experience || selectedCook.about}
                />
                <DetailRow
                  icon={<Clock size={16} />}
                  label="Applied On"
                  value={selectedCook.appliedOn}
                />
                <div className="pt-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border capitalize ${statusBadge(
                      selectedCook.status
                    )}`}
                  >
                    {selectedCook.status}
                  </span>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center gap-3 p-6 border-t border-gray-100">
                {selectedCook.status !== "approved" && (
                  <button
                    onClick={() => updateStatus(selectedCook.id, "approved")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <CheckCircle2 size={18} /> Approve
                  </button>
                )}
                {selectedCook.status !== "rejected" && (
                  <button
                    onClick={() => updateStatus(selectedCook.id, "rejected")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-[#E53935] mt-0.5">{icon}</div>
    <div>
      <p className="text-xs font-semibold uppercase text-gray-400">{label}</p>
      <p className="text-sm text-gray-800">{value}</p>
    </div>
  </div>
);

export default CookManagement;