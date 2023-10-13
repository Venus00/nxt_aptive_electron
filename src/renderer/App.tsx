import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';
import DashboardPage from './pages/DashboardPage';

export default function App() {
	return (
			<Router>
				<Routes>
					<Route path="" element={<AppLayout />}>
						<Route path="/" element={<DashboardPage />} />
					</Route>
				</Routes>
			</Router>
	);
}

