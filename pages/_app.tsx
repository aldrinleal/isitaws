import '../src/_default.css'
import '../src/App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyApp({Component, pageProps}) {
    return <Component {... pageProps} />
}
