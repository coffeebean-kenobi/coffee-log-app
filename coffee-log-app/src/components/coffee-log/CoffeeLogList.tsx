import React from 'react';
import { theme } from '../../theme';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { slideIn, hoverScale, hoverShadow } from '../../utils/animations';
import { getResponsiveValue } from '../../utils/responsive';

interface CoffeeLog {
  id: string;
  name: string;
  description: string;
  date: string;
  rating: number;
  brewingMethod: string;
}

interface CoffeeLogListProps {
  logs: CoffeeLog[];
  onLogClick: (log: CoffeeLog) => void;
  onNewLog: () => void;
}

export const CoffeeLogList: React.FC<CoffeeLogListProps> = ({
  logs,
  onLogClick,
  onNewLog,
}) => {
  const gridColumns = getResponsiveValue({
    xs: '1fr',
    sm: 'repeat(2, 1fr)',
    md: 'repeat(3, 1fr)',
    lg: 'repeat(4, 1fr)',
  }, 'repeat(auto-fill, minmax(300px, 1fr))');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing.lg,
      animation: `${slideIn.from} ${slideIn.config.duration}ms ease-out forwards`,
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
          sm: 'center',
        }, 'center'),
        gap: theme.spacing.md,
      }}>
        <h2 style={{
          margin: 0,
          fontFamily: theme.typography.fontFamily.heading,
          fontSize: getResponsiveValue({
            xs: theme.typography.fontSize.h3,
            sm: theme.typography.fontSize.h2,
          }, theme.typography.fontSize.h2),
          letterSpacing: theme.typography.letterSpacing.heading,
        }}>
          コーヒーログ
        </h2>
        <Button
          variant="primary"
          onClick={onNewLog}
          style={{
            width: getResponsiveValue({
              xs: '100%',
              sm: 'auto',
            }, 'auto'),
          }}
        >
          + NEW LOG
        </Button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: gridColumns,
        gap: theme.spacing.lg,
      }}>
        {logs.map((log, index) => (
          <Card
            key={log.id}
            onClick={() => onLogClick(log)}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              gap: theme.spacing.md,
              animation: `${slideIn.from} ${slideIn.config.duration}ms ease-out ${index * 100}ms forwards`,
              ':hover': {
                ...hoverScale,
                ...hoverShadow,
              },
            }}
          >
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
                {log.name}
              </h3>
              <p style={{
                margin: 0,
                marginBottom: theme.spacing.sm,
                color: theme.colors.text.secondary,
                fontSize: getResponsiveValue({
                  xs: theme.typography.fontSize.caption,
                  sm: theme.typography.fontSize.body2,
                }, theme.typography.fontSize.body2),
              }}>
                {log.description}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: theme.spacing.md,
                fontSize: theme.typography.fontSize.caption,
                color: theme.colors.text.secondary,
              }}>
                <span>{log.date}</span>
                <span>★ {log.rating}</span>
                <span>{log.brewingMethod}</span>
              </div>
            </div>
            <div style={{
              color: theme.colors.primary.main,
              fontSize: theme.typography.fontSize.h4,
            }}>
              →
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}; 