import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SessionLayout from "./layouts/SesssionLayout";
import MainLayout from "./layouts/MainLayout";
import AppLoaderLayout from "./layouts/AppLoaderLayout ";
import AuthLayout from "./layouts/AuthLayout";

import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import ProfilePage from "./pages/profile";
import SearchPage from "./pages/search";
import MessagesPage from "./pages/messages";
import WordListPage from "./pages/wordList";
import NotificationsPage from "./pages/notifications";
import StoriesPage from "./pages/stories";
import WelcomePage from "./pages/welcome";
import RegisterPage from "./pages/register";

import DictionaryPage from "./pages/dictionary";
import HistoryPage from "./pages/dictionary/HistoryPage";
import WordPage from "./pages/dictionary/WordPage";
import MyHistory from "./pages/dictionary/MyHistory";
import CommunityHistory from "./pages/dictionary/CommunityHistory";
import WordDetails from "./pages/dictionary/WordDetails";
import WordSentences from "./pages/dictionary/WordSentences";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLoaderLayout />}>
          <Route element={<SessionLayout />}>
            <Route element={<AuthLayout type="redirect" redirectTo="/home" />}>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route element={<AuthLayout type="protected" redirectTo="/" />}>
              <Route element={<MainLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/messages" element={<MessagesPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/word-list" element={<WordListPage />} />

                <Route path="/dictionary" element={<DictionaryPage />}>
                  <Route element={<HistoryPage />}>
                    <Route index element={<MyHistory />} />
                    <Route path="community-history" element={<CommunityHistory />} />
                  </Route>

                  <Route path=":word" element={<WordPage />}>
                    <Route index element={<WordDetails />} />
                    <Route path="sentences" element={<WordSentences />} />
                  </Route>
                </Route>

                <Route path="/stories" element={<StoriesPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
