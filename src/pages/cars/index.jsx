import configureStore from "../../misc/redux/configureStore";
import carReducer from './reducers';
import useLocationSearch from "../../misc/hooks/useLocationSearch";
import {useMemo} from "react";
import getMessages from "../cars/intl";
import {Provider} from "react-redux";
import IntlProvider from 'misc/providers/IntlProvider';
import Cars from './containers/Cars'


const store = configureStore(carReducer);

function Index(props) {
    const {
        lang,
    } = useLocationSearch();

    const messages = useMemo(() => getMessages(lang), [lang]);

    return (
        <Provider store={store}>
            <IntlProvider messages={messages}>
                <Cars {...props}/>
            </IntlProvider>
        </Provider>
    );
}

export default Index;
