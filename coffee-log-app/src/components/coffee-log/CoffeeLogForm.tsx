import React, { useState } from 'react';
import { theme } from '../../theme';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { scaleIn } from '../../utils/animations';
import { getResponsiveValue } from '../../utils/responsive';

interface CoffeeLogFormProps {
  onSubmit: (data: {
    name: string;
    description: string;
    rating: number;
    brewingMethod: string;
  }) => void;
  onCancel: () => void;
}

export const CoffeeLogForm: React.FC<CoffeeLogFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: 5,
    brewingMethod: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card style={{
      animation: `${scaleIn.from} ${scaleIn.config.duration}ms ease-out forwards`,
      maxWidth: getResponsiveValue({
        xs: '100%',
        sm: '600px',
        md: '800px',
      }, '800px'),
      margin: '0 auto',
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.lg,
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
          新しいコーヒーログ
        </h2>

        <Input
          label="コーヒー名"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          fullWidth
        />

        <div>
          <label style={{
            display: 'block',
            marginBottom: theme.spacing.xs,
            color: theme.colors.text.secondary,
            fontSize: getResponsiveValue({
              xs: theme.typography.fontSize.caption,
              sm: theme.typography.fontSize.body2,
            }, theme.typography.fontSize.body2),
            fontFamily: theme.typography.fontFamily.body,
          }}>
            メモ
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{
              width: '100%',
              padding: theme.spacing.md,
              border: theme.borders.thin,
              borderRadius: theme.borderRadius.sm,
              backgroundColor: theme.colors.background.paper,
              color: theme.colors.text.primary,
              fontFamily: theme.typography.fontFamily.body,
              fontSize: getResponsiveValue({
                xs: theme.typography.fontSize.body2,
                sm: theme.typography.fontSize.body1,
              }, theme.typography.fontSize.body1),
              minHeight: getResponsiveValue({
                xs: '80px',
                sm: '100px',
              }, '100px'),
              resize: 'vertical',
            }}
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: theme.spacing.xs,
            color: theme.colors.text.secondary,
            fontSize: getResponsiveValue({
              xs: theme.typography.fontSize.caption,
              sm: theme.typography.fontSize.body2,
            }, theme.typography.fontSize.body2),
            fontFamily: theme.typography.fontFamily.body,
          }}>
            評価
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            style={{
              width: '100%',
              accentColor: theme.colors.primary.main,
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSize.caption,
          }}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <Input
          label="抽出方法"
          value={formData.brewingMethod}
          onChange={(e) => setFormData({ ...formData, brewingMethod: e.target.value })}
          required
          fullWidth
        />

        <div style={{
          display: 'flex',
          flexDirection: getResponsiveValue({
            xs: 'column',
            sm: 'row',
          }, 'row'),
          gap: theme.spacing.md,
          justifyContent: 'flex-end',
        }}>
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            style={{
              width: getResponsiveValue({
                xs: '100%',
                sm: 'auto',
              }, 'auto'),
            }}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            variant="primary"
            style={{
              width: getResponsiveValue({
                xs: '100%',
                sm: 'auto',
              }, 'auto'),
            }}
          >
            保存
          </Button>
        </div>
      </form>
    </Card>
  );
}; 