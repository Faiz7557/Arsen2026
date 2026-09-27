export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag?: string;
}

export interface MetricCard {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
}
