import apiClient from './apiClient';

const createResourceService = (resource) => ({
  list: (params) => apiClient.get(`/${resource}`, { params }),
  get: (id) => apiClient.get(`/${resource}/${id}`),
  create: (payload) => apiClient.post(`/${resource}`, payload),
  update: (id, payload) => apiClient.put(`/${resource}/${id}`, payload),
  remove: (id) => apiClient.delete(`/${resource}/${id}`),
});

export const authService = {
  validate: () => apiClient.get('/auth/validate'),
  activityLogs: () => apiClient.get('/auth/activity-logs'),
};

export const productService = createResourceService('products');
export const orderService = createResourceService('orders');
export const customerService = createResourceService('customers');
export const offerService = createResourceService('offers');
export const salesService = createResourceService('sales-reports');
export const inventoryService = createResourceService('inventory');
export const prescriptionService = createResourceService('prescriptions');
export const deliveryService = createResourceService('deliveries');
