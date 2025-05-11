import React from 'react';
import { theme } from '../../theme';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { fadeIn } from '../../utils/animations';
import { getResponsiveValue } from '../../utils/responsive';

interface CoffeeLog {
  id: string;
  name: string;
  description: string;
  date: string;
  rating: number;
  brewingMethod: string;
}

interface CoffeeLogDetailProps {
  log: CoffeeLog;
  onEdit: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export const CoffeeLogDetail: React.FC<CoffeeLogDetailProps> = ({
  log,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <Card style={{
      animation: `${fadeIn.from} ${fadeIn.config.duration}ms ease-out forwards`,
      maxWidth: getResponsiveValue({
        xs: '100%',
        sm: '600px',
        md: '800px',
      }, '800px'),
      margin: '0 auto',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.lg,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: getResponsiveValue({
            xs: 'column',
            sm: 'row',
          }, 'row'),
          justifyContent: 'space-between',
          alignItems: getResponsiveValue({
            xs: 'stretch',
            sm: 'flex-start',
          }, 'flex-start'),
          gap: theme.spacing.md,
        }}>
          <div>
            <h2 style={{
              margin: 0,
              marginBottom: theme.spacing.xs,
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: getResponsiveValue({
                xs: theme.typography.fontSize.h3,
                sm: theme.typography.fontSize.h2,
              }, theme.typography.fontSize.h2),
              letterSpacing: theme.typography.letterSpacing.heading,
            }}>
              {log.name}
            </h2>
            <p style={{
              margin: 0,
              color: theme.colors.text.secondary,
              fontSize: getResponsiveValue({
                xs: theme.typography.fontSize.caption,
                sm: theme.typography.fontSize.body2,
              }, theme.typography.fontSize.body2),
            }}>
              {log.date}
            </p>
          </div>
          <div style={{
            display: 'flex',
            gap: theme.spacing.md,
            width: getResponsiveValue({
              xs: '100%',
              sm: 'auto',
            }, 'auto'),
          }}>
            <Button
              variant="secondary"
              onClick={onEdit}
              style={{
                flex: getResponsiveValue({
                  xs: 1,
                  sm: 'none',
                }, 'none'),
              }}
            >
              編集
            </Button>
            <Button
              variant="secondary"
              onClick={onDelete}
              style={{
                flex: getResponsiveValue({
                  xs: 1,
                  sm: 'none',
                }, 'none'),
              }}
            >
              削除
            </Button>
          </div>
        </div>

        <div style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.background.main,
          borderRadius: theme.borderRadius.sm,
          fontFamily: theme.typography.fontFamily.body,
          fontSize: getResponsiveValue({
            xs: theme.typography.fontSize.body2,
            sm: theme.typography.fontSize.body1,
          }, theme.typography.fontSize.body1),
          lineHeight: theme.typography.lineHeight.body,
        }}>
          {log.description}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: getResponsiveValue({
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
          }, 'repeat(2, 1fr)'),
          gap: theme.spacing.lg,
        }}>
          <div>
            <h3 style={{
              margin: 0,
              marginBottom: theme.spacing.xs,
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: getResponsiveValue({
                xs: theme.typography.fontSize.h4,
                sm: theme.typography.fontSize.h3,
              }, theme.typography.fontSize.h3),
              letterSpacing: theme.typography.letterSpacing.heading,
            }}>
              評価
            </h3>
            <div style={{
              fontSize: getResponsiveValue({
                xs: theme.typography.fontSize.h5,
                sm: theme.typography.fontSize.h4,
              }, theme.typography.fontSize.h4),
              color: theme.colors.primary.main,
            }}>
              {'★'.repeat(log.rating)}
              {'☆'.repeat(5 - log.rating)}
            </div>
          </div>

          <div>
            <h3 style={{
              margin: 0,
              marginBottom: theme.spacing.xs,
              fontFamily: theme.typography.fontFamily.heading,
              fontSize: getResponsiveValue({
                xs: theme.typography.fontSize.h4,
                sm: theme.typography.fontSize.h3,
              }, theme.typography.fontSize.h3),
              letterSpacing: theme.typography.letterSpacing.heading,
            }}>
              抽出方法
            </h3>
            <p style={{
              margin: 0,
              fontSize: getResponsiveValue({
                xs: theme.typography.fontSize.body2,
                sm: theme.typography.fontSize.body1,
              }, theme.typography.fontSize.body1),
            }}>
              {log.brewingMethod}
            </p>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'flex-start',
        }}>
          <Button
            variant="secondary"
            onClick={onBack}
            style={{
              width: getResponsiveValue({
                xs: '100%',
                sm: 'auto',
              }, 'auto'),
            }}
          >
            戻る
          </Button>
        </div>
      </div>
    </Card>
  );
}; 