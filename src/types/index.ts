type TabProps = {
  color: string;
  size: number;
  focused: boolean;
  colors: any;
};

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

type User = {
  uuid: string;
  name: string;
  image_url: string;
};

type AppUsage = {
  name: string;
  duration: number;
};

type Post = {
  id: number;
  user: User;
  caption: string;
  total_duration: number;
  device_usage: string;
  apps: AppUsage[];
  likes_count: number;
  comments_count: number;
  is_like: boolean;
  created_at: string;
};

type CreatePost = {
  user: string;
  caption: string;
  app: AppUsage[];
  is_week: boolean;
};

export type {TabProps, ThemeState, User, AppUsage, Post, CreatePost};
