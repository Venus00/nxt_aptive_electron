import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';
import DashboardPage from './pages/DashboardPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
export default function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="" element={<AppLayout />}>
						<Route path="/" element={<DashboardPage />} />
					</Route>
				</Routes>
			</Router>
  </Provider>

	);
}

