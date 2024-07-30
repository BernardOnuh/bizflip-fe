import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Checkbox, FormControlLabel } from '@mui/material';
import { ClipLoader } from 'react-spinners';
import cx from 'classnames';


import styles from './styles.module.scss';

const selfSettings = [
  // ... (selfSettings array content here)
];

const followerSettings = [
  // ... (followerSettings array content here)
];

const CustomCheckbox = styled(Checkbox)({
  '&.Mui-checked': {
    color: '#1969FF',
  },
});

const SettingOption = ({
  name,
  title,
  description,
  checked,
  disabled,
  onChange,
}) => (
  <FormControlLabel
    classes={{ root: styles.optionPanel }}
    control={
      <CustomCheckbox
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        name={name}
      />
    }
    label={
      <div className={styles.option}>
        <div className={styles.optionTitle}>{title}</div>
        <div className={styles.optionDesc}>{description}</div>
      </div>
    }
  />
);

const NotificationSetting = () => {
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({});

  const getSettings = async () => {
    // Replace this with the actual API call to fetch settings
    const data = await fetch('/api/notification-settings').then((res) => res.json());
    setSettings(data);
  };

  useEffect(() => {
    getSettings();
  }, []);

  const handleChange = (e) => {
    const key = e.target.name;
    const newSettings = { ...settings };
    newSettings[key] = !settings[key];
    setSettings(newSettings);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Replace this with the actual API call to update settings
      const response = await fetch('/api/update-notification-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      const result = await response.json();
      if (result.status === 'success') {
        console.log('Notification settings updated!');
      }
    } catch (err) {
      console.error('Error updating settings:', err);
    }
    setSaving(false);
  };

  const getSetting = (key) => (settings[key] === undefined ? true : settings[key]);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.title}>Notification Settings</div>
        <div className={styles.body}>
          <div className={styles.group}>
            <FormControlLabel
              className={styles.formControl}
              classes={{ label: styles.groupTitle }}
              control={
                <CustomCheckbox
                  checked={getSetting('sNotification')}
                  onChange={handleChange}
                  name="sNotification"
                />
              }
              label="Your Activity Notifications"
            />
            <div className={styles.groupOptions}>
              {selfSettings.map((option, idx) => (
                <SettingOption
                  key={idx}
                  name={option.value}
                  title={option.title}
                  description={option.description}
                  disabled={!getSetting('sNotification')}
                  checked={getSetting('sNotification') && getSetting(option.value)}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
          <div className={styles.group}>
            <FormControlLabel
              className={styles.formControl}
              classes={{ label: styles.groupTitle }}
              control={
                <CustomCheckbox
                  checked={getSetting('fNotification')}
                  onChange={handleChange}
                  name="fNotification"
                />
              }
              label="Follower Activity Notifications"
            />
            <div className={styles.groupOptions}>
              {followerSettings.map((option, idx) => (
                <SettingOption
                  key={idx}
                  name={option.value}
                  title={option.title}
                  description={option.description}
                  disabled={!getSetting('fNotification')}
                  checked={getSetting('fNotification') && getSetting(option.value)}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.buttonsWrapper}>
          <div
            className={cx(styles.createButton, saving && styles.disabled)}
            onClick={!saving ? handleSave : null}
          >
            {saving ? <ClipLoader color="#FFF" size={16} /> : 'Save Settings'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSetting;
