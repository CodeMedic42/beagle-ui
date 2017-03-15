/* eslint-disable lodash/prefer-constant  */
import composeClass from 'compose-class';
import { requires } from '../../infrastructure/utils/contracts';
import {
    onAsyncComplete,
    onAsyncFail
} from './helpers/action-async-handlers';

export default composeClass({
    constructor(name, service, notifications) {
        requires('name', name);
        requires('service', service);
        requires('notifications', notifications);

        this.name = name;
        this.service = service;
        this.notifications = notifications;

        this.generateActions(
            'create',
            'findComplete',
            'findFail'
        );
    },

    find(query) {
        this.service.find(query)
            .then(onAsyncComplete(this, 'find'))
            .catch(onAsyncFail(this, 'find'));

        return null;
    }
});
