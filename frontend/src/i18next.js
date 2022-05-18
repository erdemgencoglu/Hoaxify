import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({

    resources: {
        en: {
            translations: {
                'Sign up': 'Sign up',
                'Password mismatch': 'Password mismatch',
                'Username': 'Username',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Login': 'Login',
                'Logout': 'Logout',
                'Users': 'Users',
                'Next': 'Next',
                'Previous': 'Previous',
                'Load Failure': 'Load Failure',
                'User not found': 'User not found',
                'Edit': 'Edit',
                'Save': 'Save',
                'Cancel': 'Cancel',
                'Change Display Name': 'Change Display Name',
            }
        },
        tr: {
            translations: {
                'Sign up': 'Kayıt Ol',
                'Password mismatch': 'Şifreler uyuşmuyor',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Tercih edilen isim',
                'Password': 'Şifre',
                'Password Repeat': 'Şifreyi Tekarla',
                'Login': 'Giriş Yap',
                'Logout': 'Çıkış',
                'Users': 'Kullanıcılar',
                'Next': 'İleri',
                'Previous': 'Geri',
                'Load Failure': 'Liste alınamadı',
                'User not found': 'Kullanıcı bulunamadı',
                'Edit': 'Düzenle',
                'Save': 'Kaydet',
                'Cancel': 'İptal Et',
                'Change Display Name': 'Görünür isminizi değiştirin'
            }
        }
    },
    fallbackLng: 'tr',
    ns: ['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }

})
export default i18n