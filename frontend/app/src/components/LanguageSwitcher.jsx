import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-switcher mb-3 px-3">
            <div className="btn-group w-100" role="group">
                <button
                    type="button"
                    className={`btn btn-sm ${i18n.language === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => changeLanguage('en')}
                >
                    English
                </button>
                <button
                    type="button"
                    className={`btn btn-sm ${i18n.language === 'hi' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => changeLanguage('hi')}
                >
                    हिंदी
                </button>
                <button
                    type="button"
                    className={`btn btn-sm ${i18n.language === 'mr' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => changeLanguage('mr')}
                >
                    मराठी
                </button>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
