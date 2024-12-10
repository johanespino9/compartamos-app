import React, { useState } from 'react';
import {
  Platform,
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SubmitButton } from '../atoms/SubmitButton';
import { User } from '../../../core/models/User';
import { TextField } from '../atoms/TextField';
import DateTimePicker from '@react-native-community/datetimepicker';

interface UserFormProps {
  initialData?: User;
  onSubmit: (formData: User) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);
  const isEditMode = !!initialData.ID;

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case 'first_name':
      case 'last_name':
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/.test(value)) {
          return 'Debe contener solo letras y tener entre 2 y 50 caracteres.';
        }
        break;
      case 'phone':
        if (!/^\d{9}$/.test(value)) {
          return 'Debe tener exactamente 9 dígitos.';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Debe ser un correo electrónico válido.';
        }
        break;
      case 'city':
        if (!value.trim()) {
          return 'La ciudad no puede estar vacía.';
        }
        break;
      case 'dni':
        if (!/^\d{8}$/.test(value)) {
          return 'Debe tener exactamente 8 dígitos.';
        }
        break;
      case 'birth_date':
        const age = calculateAge(new Date(value));
        if (age < 18) {
          return 'Debes ser mayor de 18 años.';
        }
        break;
      case 'gender':
        if (!value) {
          return 'El género es obligatorio.';
        }
        break;
    }
    return '';
  };

  const calculateAge = (birth_date: Date): number => {
    const today = new Date();
    const age = today.getFullYear() - birth_date.getFullYear();
    const monthDiff = today.getMonth() - birth_date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth_date.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS !== 'ios') {
      setShowDatePickerModal(false);
    }

    if (selectedDate) {
      const birth_date = selectedDate.toISOString().split('T')[0];
      const error = validateField('birth_date', birth_date);
      setErrors((prev) => ({ ...prev, birth_date: error }));
      setFormData({
        ...formData,
        birth_date,
      });
    }
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('FORM DATA', formData)
      onSubmit(formData);
    }
  };

  return (
    <ScrollView>
      <TextField
        label="Nombre"
        style={styles.textField}
        value={formData.first_name}
        onChangeText={(text) => {
          setErrors((prev) => ({ ...prev, first_name: validateField('first_name', text) }));
          setFormData({ ...formData, first_name: text });
        }}
        error={errors.first_name}
      />
      <TextField
        label="Apellido"
        style={styles.textField}
        value={formData.last_name}
        onChangeText={(text) => {
          setErrors((prev) => ({ ...prev, last_name: validateField('last_name', text) }));
          setFormData({ ...formData, last_name: text });
        }}
        error={errors.last_name}
      />
      <TextField
        label="Celular"
        style={styles.textField}
        value={formData.phone}
        onChangeText={(text) => {
          setErrors((prev) => ({ ...prev, phone: validateField('phone', text) }));
          setFormData({ ...formData, phone: text });
        }}
        error={errors.phone}
      />
      <TextField
        label="Correo electrónico"
        style={styles.textField}
        value={formData.email}
        onChangeText={(text) => {
          setErrors((prev) => ({ ...prev, email: validateField('email', text) }));
          setFormData({ ...formData, email: text });
        }}
        error={errors.email}
      />
      <TextField
        label="Ciudad"
        style={styles.textField}
        value={formData.city}
        onChangeText={(text) => {
          setErrors((prev) => ({ ...prev, city: validateField('city', text) }));
          setFormData({ ...formData, city: text });
        }}
        error={errors.city}
      />

      {!isEditMode && (
        <>
          <TextField
            label="DNI"
            style={styles.textField}
            value={formData.dni}
            onChangeText={(text) => {
              setErrors((prev) => ({ ...prev, dni: validateField('dni', text) }));
              setFormData({ ...formData, dni: text });
            }}
            error={errors.dni}
          />

          <TextField
            label="Género"
            style={styles.textField}
            value={formData.gender}
            onChangeText={(text) => {
              setErrors((prev) => ({ ...prev, gender: validateField('gender', text) }));
              setFormData({ ...formData, gender: text });
            }}
            error={errors.gender}
          />
          
          <TextField
            label="Fecha de nacimiento"
            style={styles.textField}
            value={formData.birth_date ? new Date(formData.birth_date).toLocaleDateString('es-ES') : ''}
            onPressIn={() => setShowDatePickerModal(true)}
            error={errors.birth_date}
          />
          {Platform.OS === 'android' && showDatePickerModal && (
            <DateTimePicker
              value={formData.birth_date ? new Date(formData.birth_date) : new Date()}
              mode="date"
              display={'default'}
              onChange={handleDateChange}
              maximumDate={new Date()}
              locale="es-ES"
              style={{ marginBottom: 16 }}
            />
          )}
        </>
      )}

      {/* Género Field */}


      <SubmitButton title="Guardar" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textField: {
    marginVertical: 16,
  },
});
