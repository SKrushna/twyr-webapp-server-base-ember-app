import BaseRoute from '../../framework/base-route';

export default BaseRoute.extend({
	init() {
		this._super(...arguments);
		this.get('currentUser').on('userDataUpdated', this, this.onUserDataUpdated);
	},

	destroy() {
		this.get('currentUser').off('userDataUpdated', this, this.onUserDataUpdated);
		this._super(...arguments);
	},

	onUserDataUpdated() {
		if(!window.twyrTenantId) {
			this.get('store').unloadAll('tenant-administration/feature-manager/tenant-feature');
			this.get('store').unloadAll('server-administration/feature');
			this.get('store').unloadAll('server-administration/feature-permission');

			return null;
		}
	}
});