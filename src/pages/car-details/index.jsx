import configureStore from "../../misc/redux/configureStore";
import carDetailReducer from "./reducers";
import useLocationSearch from "../../misc/hooks/useLocationSearch";
import {useMemo} from "react";
import getMessages from "./intl";
import {Provider} from "react-redux";
import IntlProvider from 'misc/providers/IntlProvider';
import CarDetail from './containers/CarDetail'

const store = configureStore(carDetailReducer);

function Index(props) {
    const {
        lang,
    } = useLocationSearch();

    const messages = useMemo(() => getMessages(lang), [lang]);

    return (
        <Provider store={store}>
            <IntlProvider messages={messages}>
                <CarDetail {...props}/>
            </IntlProvider>
        </Provider>
    );
}

export default Index;