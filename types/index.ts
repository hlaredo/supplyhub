/**
 * Type Definitions
 * 
 * Core type definitions for the application.
 */

export * from './article';
export * from './footer';
export * from './feature';

export interface Article {
  id: number;
  title: string;
  image: string;
  summary: string;
}

export interface Feature {
  title: string;
  icon: string;
  description: string;
  color: 'primary' | 'secondary' | 'accent';
}

export interface SocialLink {
  platform: string;
  icon: string;
  href: string;
} 