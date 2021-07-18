export const getClients = (state) => state.clients.clients;
export const getClientsLoadingStatus = (state) =>
  state.clients.isClientsLoading;
export const getClientsIsFilteredStatus = (state) => state.clients.isFilter;
export const getFilteredClients = (state) => state.clients.filteredClients;
