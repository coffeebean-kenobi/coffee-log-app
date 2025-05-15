import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard, AnimatedButton, AnimatedList, AnimatedListItem, AnimatedHeader, AnimatedStats } from './components';
import { animations, transitions } from './animations';
import { naturalWarmTheme as theme } from '../color-typography/natural-warm/theme';

export const InteractiveLayoutExample = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const coffeeLogs = [
    {
      id: 1,
      title: 'エチオピア イルガチェフェ',
      description: '柑橘系の酸味とジャスミンのような香りが特徴的な、洗練された一杯。',
      date: '2024年3月15日',
      rating: '★★★★☆',
    },
    {
      id: 2,
      title: 'グアテマラ アンティグア',
      description: 'チョコレートのような甘みとバランスの取れた酸味が特徴。',
      date: '2024年3月14日',
      rating: '★★★★★',
    },
    {
      id: 3,
      title: 'コロンビア スプレモ',
      description: 'ナッツのような香りとまろやかな口当たりが特徴。',
      date: '2024年3月13日',
      rating: '★★★☆☆',
    },
  ];

  return (
    <div style={{ 
      backgroundColor: theme.colors.background.main,
      minHeight: '100vh',
      fontFamily: theme.typography.fontFamily.body,
      padding: theme.spacing.lg,
    }}>
      <AnimatedHeader>
        <h1 style={{
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: theme.typography.fontSize.h1,
          color: theme.colors.primary.main,
          marginBottom: theme.spacing.xl,
        }}>
          LOGCUP
        </h1>
      </AnimatedHeader>

      <AnimatedStats>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: theme.spacing.lg,
          marginBottom: theme.spacing.xl,
        }}>
          {[
            { title: '今週のコーヒー', value: '12杯' },
            { title: 'お気に入りショップ', value: '5店舗' },
            { title: '総コーヒー数', value: '156杯' },
          ].map((stat, index) => (
            <AnimatedCard key={index}>
              <div style={{
                backgroundColor: theme.colors.background.paper,
                padding: theme.spacing.lg,
                borderRadius: theme.borderRadius.lg,
                boxShadow: theme.shadows.md,
                border: `1px solid ${theme.colors.secondary.light}`,
              }}>
                <h3 style={{
                  fontFamily: theme.typography.fontFamily.heading,
                  fontSize: theme.typography.fontSize.h4,
                  color: theme.colors.text.primary,
                  marginBottom: theme.spacing.sm,
                }}>
                  {stat.title}
                </h3>
                <p style={{
                  fontSize: theme.typography.fontSize.h2,
                  color: theme.colors.accent.main,
                  margin: 0,
                }}>
                  {stat.value}
                </p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedStats>

      <AnimatedList>
        <div style={{
          backgroundColor: theme.colors.background.paper,
          borderRadius: theme.borderRadius.lg,
          boxShadow: theme.shadows.md,
          border: `1px solid ${theme.colors.secondary.light}`,
          overflow: 'hidden',
        }}>
          <div style={{
            padding: theme.spacing.lg,
            borderBottom: `1px solid ${theme.colors.secondary.light}`,
          }}>
            <h2 style={{
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: theme.typography.fontSize.h3,
              color: theme.colors.text.primary,
              margin: 0,
            }}>
              最近のコーヒーログ
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: theme.spacing.lg,
            padding: theme.spacing.lg,
          }}>
            {coffeeLogs.map((log, index) => (
              <AnimatedListItem key={log.id} index={index}>
                <AnimatedCard onClick={() => setSelectedCard(selectedCard === log.id ? null : log.id)}>
                  <div style={{
                    backgroundColor: theme.colors.background.main,
                    borderRadius: theme.borderRadius.lg,
                    overflow: 'hidden',
                    border: `1px solid ${theme.colors.secondary.light}`,
                  }}>
                    <motion.div
                      style={{
                        height: '200px',
                        backgroundImage: 'url("/coffee-placeholder.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={transitions.smooth}
                    />
                    <div style={{ padding: theme.spacing.lg }}>
                      <h3 style={{
                        fontFamily: theme.typography.fontFamily.heading,
                        fontSize: theme.typography.fontSize.h4,
                        color: theme.colors.text.primary,
                        marginBottom: theme.spacing.sm,
                      }}>
                        {log.title}
                      </h3>
                      <AnimatePresence>
                        {selectedCard === log.id && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={transitions.smooth}
                            style={{
                              color: theme.colors.text.secondary,
                              fontSize: theme.typography.fontSize.body1,
                              marginBottom: theme.spacing.md,
                              overflow: 'hidden',
                            }}
                          >
                            {log.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <span style={{
                          color: theme.colors.accent.main,
                          fontSize: theme.typography.fontSize.body2,
                        }}>
                          {log.date}
                        </span>
                        <span style={{
                          color: theme.colors.accent.main,
                          fontSize: theme.typography.fontSize.body2,
                        }}>
                          {log.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </AnimatedCard>
              </AnimatedListItem>
            ))}
          </div>
        </div>
      </AnimatedList>

      <AnimatedButton onClick={() => setIsExpanded(!isExpanded)}>
        <motion.button
          style={{
            position: 'fixed',
            bottom: theme.spacing.xl,
            right: theme.spacing.xl,
            backgroundColor: theme.colors.accent.main,
            color: theme.colors.background.main,
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            border: 'none',
            boxShadow: theme.shadows.lg,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
          }}
          animate={{
            rotate: isExpanded ? 45 : 0,
            scale: isExpanded ? 1.1 : 1,
          }}
          transition={transitions.smooth}
        >
          +
        </motion.button>
      </AnimatedButton>
    </div>
  );
}; 